import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { generateId } from 'better-auth';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, loginSchema } from './dto/login.dto';
import { RefreshTokenDto, refreshTokenSchema } from './dto/refresh-token.dto';
import { RegisterDto, registerSchema } from './dto/register.dto';

const DEFAULT_ACCESS_TTL_MS = 1000 * 60 * 15; // 15 minutes
const DEFAULT_REFRESH_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

export interface AuthResponse {
  user: Omit<User, 'passwordHash'>;
  tokens: AuthTokens;
}

@Injectable()
export class AuthService {
  private readonly accessTokenTtlMs: number;
  private readonly refreshTokenTtlMs: number;
  private readonly jwtExpiresInOption: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpiresInOption = this.configService.get<string>('JWT_EXPIRES_IN') ?? '15m';
    this.accessTokenTtlMs = this.parseDurationToMs(
      this.configService.get<string>('JWT_EXPIRES_IN'),
      DEFAULT_ACCESS_TTL_MS,
    );
    this.refreshTokenTtlMs = this.parseDurationToMs(
      this.configService.get<string>('REFRESH_TOKEN_TTL'),
      DEFAULT_REFRESH_TTL_MS,
    );
  }

  async register(payload: RegisterDto): Promise<AuthResponse> {
    const data = registerSchema.parse(payload);

    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
      },
    });

    const tokens = await this.createSessionTokens(user);

    return {
      user: this.toPublicUser(user),
      tokens,
    };
  }

  async login(payload: LoginDto): Promise<AuthResponse> {
    const data = loginSchema.parse(payload);

    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(data.password, user.passwordHash);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.createSessionTokens(user);

    return {
      user: this.toPublicUser(user),
      tokens,
    };
  }

  async refreshTokens(payload: RefreshTokenDto): Promise<AuthTokens> {
    const data = refreshTokenSchema.parse(payload);

    const existingSession = await this.prisma.session.findUnique({
      where: { refreshToken: data.refreshToken },
      include: { user: true },
    });

    if (!existingSession || existingSession.expiresAt <= new Date()) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.prisma.session.delete({
      where: { id: existingSession.id },
    });

    return this.createSessionTokens(existingSession.user);
  }

  async logout(payload: RefreshTokenDto): Promise<void> {
    const data = refreshTokenSchema.parse(payload);

    await this.prisma.session.deleteMany({
      where: { refreshToken: data.refreshToken },
    });
  }

  async getProfile(userId: string): Promise<Omit<User, 'passwordHash'>> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.toPublicUser(user);
  }

  private async createSessionTokens(user: User): Promise<AuthTokens> {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.jwtExpiresInOption,
    });

    const refreshToken = generateId(48);
    const expiresAt = new Date(Date.now() + this.refreshTokenTtlMs);

    await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: Math.floor(this.accessTokenTtlMs / 1000),
      tokenType: 'Bearer',
    };
  }

  private toPublicUser(user: User): Omit<User, 'passwordHash'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...rest } = user;
    return rest;
  }

  private parseDurationToMs(input: string | undefined, fallback: number): number {
    if (!input) {
      return fallback;
    }

    const numeric = Number(input);
    if (!Number.isNaN(numeric) && numeric > 0) {
      return numeric * 1000; // seconds to milliseconds
    }

    const match = input.trim().match(/^(\d+)([smhd])$/i);

    if (!match) {
      return fallback;
    }

    const value = Number(match[1]);
    const unit = match[2].toLowerCase();

    const unitMs: Record<string, number> = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    };

    return value * (unitMs[unit] ?? fallback);
  }
}

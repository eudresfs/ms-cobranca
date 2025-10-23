import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { z } from 'zod';

const RegisterSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6),
  nome: z.string().min(3),
});

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async registro(data: unknown) {
    const validated = RegisterSchema.parse(data);

    const senhaHash = await bcrypt.hash(validated.senha, 10);

    const usuario = await this.prisma.t_usuarios.create({
      data: {
        email: validated.email,
        nome: validated.nome,
        senha_hash: senhaHash,
      },
    });

    const token = this.jwt.sign({ sub: usuario.id, email: usuario.email });

    return {
      token,
      usuario: { id: usuario.id, email: usuario.email, nome: usuario.nome },
    };
  }

  async login(email: string, senha: string) {
    const usuario = await this.prisma.t_usuarios.findUnique({ where: { email } });

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaCorreta) {
      throw new Error('Senha incorreta');
    }

    const token = this.jwt.sign({ sub: usuario.id, email: usuario.email });

    return {
      token,
      usuario: { id: usuario.id, email: usuario.email, nome: usuario.nome },
    };
  }
}

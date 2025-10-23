import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registro')
  async registro(@Body() body: unknown) {
    return this.authService.registro(body);
  }

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    return this.authService.login(body.email, body.senha);
  }
}

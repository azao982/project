import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const token = await this.authService.validateUser(body.email, body.password);
    if (!token) throw new UnauthorizedException('Email ou mot de passe invalide');
    return token;
  }
}

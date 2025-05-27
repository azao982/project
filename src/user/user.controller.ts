import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ✅ Enregistrement utilisateur avec mot de passe hashé
  @Post('register')
  async register(@Body() body: { nom: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    return this.userService.create({
      nom: body.nom,
      email: body.email,
      password: hashedPassword,
      role: 'customer', // 👈 par défaut customer (si pas dans le body)
    });
  }

  // ✅ Routes protégées par rôles
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin-only')
  @Roles('admin')
  findForAdmin() {
    return 'Accessible uniquement aux admins';
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('seller-only')
  @Roles('seller')
  findForSeller() {
    return 'Accessible uniquement aux vendeurs';
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('public')
  @Roles('admin', 'seller', 'customer')
  findForAll() {
    return 'Accessible à tous les rôles';
  }
}

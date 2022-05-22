import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwtAuth.guard';
import { LocalAuthGuard } from './localAuth.guard';
import { Roles } from './roles.decorator';
import * as bcrypt from 'bcrypt';
import { PermissionsService } from 'src/models/permissions/permissions.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private permissionsService: PermissionsService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async Login(@Request() req) {
    return this.authService.Login(req.user);
  }

  @Roles('getProfile')
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async Profile(@Request() req) {
    return { ddd: 'df' };
  }

  @Post('/salt')
  async Salt(@Body() { Nickname }) {
    return this.authService.getSalt(Nickname);
  }

  @Get('/gensalt')
  async genSalt() {
    return bcrypt.genSalt();
  }

  @Post('/refresh')
  async Refresh(@Body() { Nickname, refresh_token }) {
    return this.authService.getToken(Nickname, refresh_token);
  }
}

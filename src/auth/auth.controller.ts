import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/models/users/dto/create-user.dto';
import { User } from 'src/models/users/users.model';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwtAuth.guard';
import { LocalAuthGuard } from './localAuth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import * as bcrypt from 'bcrypt';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async Login(@Request() req) {
    console.log('validate');
    return this.authService.Login(req.user);
  }

  @Roles({ getProfile: true })
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

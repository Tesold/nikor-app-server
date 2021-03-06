import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/models/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {
    super();
  }

  async validate(Nickname: string, PasswordHash: string): Promise<any> {
    const user = await this.userService.checkPasswordByName(
      Nickname,
      PasswordHash,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

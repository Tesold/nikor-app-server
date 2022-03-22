import { CacheModule, CACHE_MANAGER, forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModuleOptions, PassportModule } from '@nestjs/passport';
import { ApiModule } from 'src/api/api.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthModuleOptions, ],
  exports:[AuthService],
  imports:
  [
    CacheModule.register(),
    forwardRef(()=>UsersModule),
    forwardRef(()=>ApiModule),
    PermissionsModule,
    PassportModule,
    JwtModule.register(
      {
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '120s'}  
      }
    ),
  ]
})
export class AuthModule {}

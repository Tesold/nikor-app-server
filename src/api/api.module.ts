import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModuleOptions } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { jwtConstants } from 'src/auth/constants';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { LocalStrategy } from 'src/auth/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  controllers: [ApiController],
  providers: [ApiService, AuthModuleOptions, ],
  exports:[ApiService],
  imports:
  [
    CacheModule.register(),
    forwardRef(()=>UsersModule),
    forwardRef(()=>AuthModule),
    //PermissionsModule,
    //PassportModule,
    JwtModule.register(
      {
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s'}  
      }
    ),
  ]
})
export class ApiModule {}

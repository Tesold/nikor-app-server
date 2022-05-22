import { CacheModule, CACHE_MANAGER, forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModuleOptions, PassportModule } from '@nestjs/passport';
import { ApiModule } from 'src/api/api.module';
import { PermissionsModule } from 'src/models/permissions/permissions.module';
import { PermissionsService } from 'src/models/permissions/permissions.service';
import { UsersModule } from 'src/models/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwtAuth.guard';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard, AuthModuleOptions],
  exports: [AuthService, JwtModule, JwtAuthGuard],
  imports: [
    CacheModule.register(),
    forwardRef(() => UsersModule),
    forwardRef(() => ApiModule),
    forwardRef(() => PermissionsModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [PermissionsModule],
      useFactory: async ()=> ({secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' }}),
      inject: [PermissionsService],
      
    
    }),
  ],
})
export class AuthModule {}

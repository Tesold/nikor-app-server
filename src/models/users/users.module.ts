import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { AuthModuleOptions } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApiModule } from 'src/api/api.module';
import { AuthModule } from 'src/auth/auth.module';
import { PermissionsModule } from 'src/models/permissions/permissions.module';
import { BlackList } from './black-list.model';
import { Password } from './pass.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthModuleOptions],
  imports: [
    SequelizeModule.forFeature([User, Password, BlackList]),
    forwardRef(() => AuthModule),
    forwardRef(() => ApiModule),
    forwardRef(() => PermissionsModule),
    CacheModule.register(),
  ],
  exports: [UsersService],
})
export class UsersModule {}

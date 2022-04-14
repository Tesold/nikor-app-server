import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApiModule } from 'src/api/api.module';
import { AuthModule } from 'src/auth/auth.module';
import { PermissionsModule } from 'src/models/permissions/permissions.module';
import { Permission } from '../permissions/permissions.model';
import { BlackList } from './black-list.model';
import { Password } from './pass.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Password, BlackList]),
    PermissionsModule,
    Permission,
    forwardRef(() => AuthModule),
    forwardRef(() => ApiModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}

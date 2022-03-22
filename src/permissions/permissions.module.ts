import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { PermissionsController } from './permissions.controller';
import { Permission } from './permissions.model';
import { PermissionsService } from './permissions.service';
import { UserPermissions } from './UsersPermissions';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [
    SequelizeModule.forFeature([Permission, User, UserPermissions])
  ],
  exports:
  [
    PermissionsService,
  ]
})
export class PermissionsModule {}

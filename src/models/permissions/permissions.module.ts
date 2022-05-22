import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/models/users/users.model';
import { PermissionsController } from './permissions.controller';
import { Permission } from './permissions.model';
import { PermissionsService } from './permissions.service';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [
    SequelizeModule.forFeature([Permission, User]),
    forwardRef(() => AuthModule)
],
  exports: [PermissionsService],
})
export class PermissionsModule {}

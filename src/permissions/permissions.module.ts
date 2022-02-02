import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionsController } from './permissions.controller';
import { Permission } from './permissions.model';
import { PermissionsService } from './permissions.service';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [
    SequelizeModule.forFeature([Permission])
  ]
})
export class PermissionsModule {}

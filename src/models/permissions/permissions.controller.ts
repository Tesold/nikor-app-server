import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private permissionService: PermissionsService) {}

  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.permissionService.createPermission(dto);
  }

  @Get('/:value')
  getPermissionByName(@Param('value') name: string) {
    return this.permissionService.getPermissionByName(name);
  }
}

import { Controller } from '@nestjs/common';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private permissionService: PermissionsService) {}

  /*@Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.permissionService.createPermission(dto);
  }*/

  /*@Get('/:value')
  getPermissionByName(@Param('value') name: string) {
    return this.permissionService.getPermissionByName(name);
  }*/

  /*@Get('/create/admin')
  createAdmin(){
    return this.permissionService.createPermission({
      Name: 'ADMIN',
      addUsers: true,
      deleteUsers: true,
      editUsers: true,
      manageTasks: true,
      departmentTasks: true,
      editUsersPassword: true,
      manageScoupes: true,
      managePositions: true,
      managePositionNames: true,
      manageDepartment: true,
      manageGeneraPositions: true,
      managment: true
    });
  }*/

  /*@Get('/create/manager')
  createAdmin(){
    return this.permissionService.createPermission({
      Name: 'SUPERVISOR',
      addUsers: false,
      deleteUsers: false,
      editUsers: false,
      manageTasks: true,
      departmentTasks: false,
      editUsersPassword: false,
      manageScoupes: false,
      managePositions: false,
      managePositionNames: false,
      manageDepartment: false,
      manageGeneraPositions: false,
      managment: false
    });
  }*/
}

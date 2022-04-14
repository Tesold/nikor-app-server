import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PermissionsService } from 'src/models/permissions/permissions.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionsService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<Object>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    
    console.log("RolesGuard");
    if (!requiredRole) {
      return true;
    }
    const req = context.switchToHttp().getRequest();

    const header = req.headers.authorization;
    const token = header.split(' ')[1];
    const user = this.jwtService.verify(token);
    const Config = JSON.parse(JSON.stringify((await this.permissionService.getPermissionByName(user.Permission.Name)).Config));

    


    return Config.some(element=>element===requiredRole);

  }
}

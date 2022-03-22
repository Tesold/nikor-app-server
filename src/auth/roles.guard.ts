import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PermissionsService } from 'src/models/permissions/permissions.service';
import { ROLES_KEY } from './roles.decorator';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private permissionService: PermissionsService, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Object[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();

    const header = req.headers.authorization;
    const token = header.split(' ')[1];
    const user = this.jwtService.verify(token);
    const Configs = [];
    const parsedConfig = [];

      for(const element of user.Permissions)
      {
        Configs.push((await this.permissionService.getPermissionByName(element)).Config)
      }

    Configs.forEach(element =>{
      Object.entries(element).forEach(([key, value])=>{
          const O = new Object();
          O[key]=value;
          parsedConfig.push(JSON.stringify(O));
      }
      )});
    
    return parsedConfig.some((role:string) => JSON.stringify(requiredRoles).includes(role));
  }
}
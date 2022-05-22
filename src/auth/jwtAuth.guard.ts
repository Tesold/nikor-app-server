import {
  CACHE_MANAGER,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { PermissionsService } from 'src/models/permissions/permissions.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private permissionsService: PermissionsService,
    private reflector: Reflector,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //try {
      const requiredRole = this.reflector.getAllAndOverride<string>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
        console.log(requiredRole)
      if (!requiredRole) {
        console.log("нет роли")
        let req = context.switchToHttp().getRequest();
        const body = req.body;
        const header = req.headers.authorization;
        const token = header.split(' ')[1];
        const user = this.jwtService.verify(token);
        req.user = user;
        req.body = body;

        if (token === (await this.cacheManager.get(user.Nickname + '@'))) {
          return true;
        }else return false;
      }

      let req = context.switchToHttp().getRequest();
      const header: string = req.headers.authorization;
      const token = header.split(' ')[1];
      const user = this.jwtService.verify(token);
      req.user = user;
      const pername: string = user.Permission.Name;
      const Config = await this.permissionsService.getPermissionByName(pername);
      console.log(Config);
      console.log(Config[requiredRole]);
      console.log(Config[requiredRole]===true&&token === (await this.cacheManager.get(user.Nickname + '@')))
      return Config[requiredRole]===true&&token === (await this.cacheManager.get(user.Nickname + '@'));

    //} catch {
    //  throw new UnauthorizedException();
    //}
  }
}

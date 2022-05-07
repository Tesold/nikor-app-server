import {
  CACHE_MANAGER,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsService } from 'src/models/permissions/permissions.service';
import { ROLES_KEY } from './roles.decorator';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private permissionService: PermissionsService,
    private reflector: Reflector,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRole = this.reflector.getAllAndOverride<Object>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRole) {
        let req = context.switchToHttp().getRequest();
        const body = req.body;
        const header = req.headers.authorization;
        const token = header.split(' ')[1];
        const user = this.jwtService.verify(token);
        req.user = user;
        req.body = body;

        if (token === (await this.cacheManager.get(user.Nickname + 2))) {
          return true;
        }
      }

      let req = context.switchToHttp().getRequest();
      const header: string = req.headers.authorization;
      const token = header.split(' ')[1];
      const user = this.jwtService.verify(token);
      req.user = user;

      const Config = JSON.parse(JSON.stringify(user.Permission.Config));

      let hasRole: boolean;

      for(let key in requiredRole)
      for(let key2 in Config)
      if(requiredRole[key]===Config[key2])
      hasRole = true;


      

      return (
        token === (await this.cacheManager.get(user.Nickname + 2)) && hasRole
      );
    } catch {
      throw new UnauthorizedException();
    }
  }
}

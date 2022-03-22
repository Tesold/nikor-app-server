import { CACHE_MANAGER, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsService } from 'src/permissions/permissions.service';
import { ROLES_KEY } from './roles.decorator';
import { Cache , } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private permissionService: PermissionsService, private reflector: Reflector, @Inject(CACHE_MANAGER) private cacheManager: Cache, private jwtService: JwtService){
        super();
    }
    
    async canActivate(context: ExecutionContext): Promise<boolean> {

      try{
        const requiredRoles = this.reflector.getAllAndOverride<Object[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
        
            if(!requiredRoles)
            {
                const req = context.switchToHttp().getRequest();
                const header = req.headers.authorization;
                const token = header.split(' ')[1];
                const user = this.jwtService.verify(token);
                req.user=user;

                if(token === await this.cacheManager.get(user.Nickname+2))
                {
                  //super.canActivate(context);

                    return true;
                }
            }
            
                const req = context.switchToHttp().getRequest();
                const header:string = req.headers.authorization;
                const token = header.split(' ')[1];
                const user = this.jwtService.verify(token);
                req.user=user;
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
                
                  
                    const hasRole = parsedConfig.some((role:string) => JSON.stringify(requiredRoles).includes(role));
  
                    return (token === await this.cacheManager.get(user.Nickname+2))&&hasRole;

                }
                catch{throw new UnauthorizedException();}
    }
}

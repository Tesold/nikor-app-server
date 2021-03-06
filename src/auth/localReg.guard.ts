import {
    CACHE_MANAGER,
    ExecutionContext,
    Inject,
    Injectable,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { Cache } from 'cache-manager';
  
  @Injectable()
  export class LocalRegGuard extends AuthGuard('local') {
    constructor(
      @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {
      super();
    }
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      try {
    
            const req = context.switchToHttp().getRequest();
            const header = req.headers.authorization;
            const email = header.split(' ')[1];
            const key = header.split(' ')[2];

            try{
            req.scoupe=key.split('&&')[1];
            }
            catch{
              req.scoupe=null;
            }

            const key2=await this.cacheManager.get("Email:"+email)

            if (key === key2) {
                return true;
            }

            console.log("Код не верен!")
            return false;
        
        }
        catch{console.log("Код не верен!");return false}
    }
  }
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';
import { CACHE_MANAGER, Inject, Injectable, UnauthorizedException, } from '@nestjs/common';
import { Cache , } from 'cache-manager';

@Injectable()
export class AuthService {

    constructor (private usersService: UsersService, 
                private jwtService: JwtService,
                @Inject(CACHE_MANAGER) private cacheManager: Cache){
    }

    async validateUser(Nickname: string, PasswordHash: string): Promise<any> {
        const user = await this.usersService.checkPasswordByName(Nickname, PasswordHash);
        if (user) {
          const { Password, ...result } = user;
          return result;
        }
        return null;
      }


    async getSalt(username)
    {
        return (await this.usersService.getUserByName(username, true)).Password.Salt;
    }
    
    async Login(user: User)
    {
        if(user)
        {
            const payload = {Nickname: user.Nickname, Birthday: user.Birthday, FirstName: user.FirstName, LastName: user.LastName, MiddleName: user.MiddleName, Permissions: user.PermissionID.map(permission=>{return permission.Name})}
            const crypto = require('crypto');
            const refreshToken = crypto.randomBytes(512).toString('hex');
            const accesToken = this.jwtService.sign(payload);
            this.cacheManager.set(user.Nickname, refreshToken, { ttl: 604800 })
            this.cacheManager.set(user.Nickname+2, accesToken, { ttl: 60 });
            return {access_token: accesToken, refresh_token: refreshToken, payload}
        }

        return new UnauthorizedException();
    }

    async getToken(nickname:string, token:string)
    {
        if(await this.cacheManager.get(nickname)===token)
        {
            const user = await this.usersService.getUserByName(nickname, false);
            const payload = {Nickname: user.Nickname, Permissions: user.PermissionID.map(permission=>{return permission.Name})}
            const crypto = require('crypto');
            const refreshToken = crypto.randomBytes(512).toString('hex');
            const accesToken = this.jwtService.sign(payload);
            this.cacheManager.del(user.Nickname);
            this.cacheManager.set(user.Nickname, refreshToken, { ttl: 604800 });
            this.cacheManager.del(user.Nickname+2);
            this.cacheManager.set(user.Nickname+2, accesToken, { ttl: 60 });
            return {access_token: accesToken, refresh_token: refreshToken}
        }

        return new UnauthorizedException("не тот рефрештокен");
    }

}

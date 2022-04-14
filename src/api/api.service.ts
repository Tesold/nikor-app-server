import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { Cache } from 'cache-manager';

@Injectable()
export class ApiService {
  constructor(private userService: UsersService, @Inject(CACHE_MANAGER) private cacheManager: Cache,) {}

  async getEmployeers(Nickname: string, ScoupeID?: number) {
    
    let users:any;

    if(ScoupeID)
    users = await this.userService.getAllusersExcept(Nickname, ScoupeID);
    else
    users = await this.userService.getAllusersExcept(Nickname);

    return users;
  }

  async createRegCode(Email:any) {
    const crypto = require('crypto');
    const key = crypto.randomBytes(16).toString('hex');
    this.cacheManager.set("Email:"+Email, key, { ttl: 86400 });

    return key;
  }


}

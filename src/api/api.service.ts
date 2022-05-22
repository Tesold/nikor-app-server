import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { Cache } from 'cache-manager';

@Injectable()
export class ApiService {
  constructor(private userService: UsersService, @Inject(CACHE_MANAGER) private cacheManager: Cache,) {}

  async getEmployeers(Nickname: string, ScoupeID: any, DepartmentID:any) {
    
    let users:any;
    
    users = await this.userService.getAllusersExcept(Nickname, ScoupeID, DepartmentID);

    return users;
  }

  async createRegCode(Email:any, ScoupeID?:any) {
    const crypto = require('crypto');
    let key: string;
    console.log("getcode")
    if(ScoupeID)
    key = crypto.randomBytes(16).toString('hex') + '&&' + JSON.stringify({ScoupeID});
    else
    key = crypto.randomBytes(16).toString('hex');

    this.cacheManager.set("Email:"+Email, key, { ttl: 86400 });

    return {Code: key};
  }


}

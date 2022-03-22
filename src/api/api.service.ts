import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ApiService {
    constructor(private userService:UsersService){}

    async getEmployeers(Nickname:string) {
        const users= await this.userService.getAllusersExcept(Nickname);
        
        return users;
    }
}

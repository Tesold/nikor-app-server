import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { LocalRegGuard } from 'src/auth/localReg.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UsersService } from 'src/models/users/users.service';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService, private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('get/employees')
  async Employeers(@Request() {user}) {
    console.log(user.Nickname)
    return this.apiService.getEmployeers(user.Nickname, user.ScoupeID);
  }

  @UseGuards(LocalRegGuard)
  @Post('create/user')
  async Registrate(@Body() {user}) {
    console.log(user)
    return this.usersService.createUser(user);
  }

  //@Roles({ addUsers: true })
  @UseGuards(JwtAuthGuard)
  @Post('get/code')
  async getCode(@Body() {Email}) {
    console.log("Email: "+ Email)
    return this.apiService.createRegCode(Email);
  }
}

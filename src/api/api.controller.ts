import { Controller, Post, UseGuards, Request, Body, HttpException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { LocalRegGuard } from 'src/auth/localReg.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UsersService } from 'src/models/users/users.service';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor( private apiService: ApiService, private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('get/employees')
  async Employeers(@Request() {user, body}) {
    return this.usersService.getAllusersExcept(user.Nickname, user.ScoupeID, user.Permission.Name, body.DepartmentID);
  }

  @Roles('editUsers')
  @UseGuards(JwtAuthGuard)
  @Post('delete/employeescoupe')
  async setEmpleyeeScoupeNull(@Request() req) {
    this.usersService.setUserScoupeNull(req.body.UserID);
  }

  @UseGuards(LocalRegGuard)
  @Post('create/user')
  async Registrate(@Body() {user}, @Request() req) {
    return await this.usersService.createUser({...user, ScoupeID:req.scoupe});
  }

  @Roles('editUsers')
  @UseGuards(JwtAuthGuard)
  @Post('set/employeescoupe')
  async setScoupeForUser(@Request() {body}) {
    this.usersService.setScoupeForUser(body.ScoupeID, body.UserID);
  }

  @Roles('addUsers')
  @UseGuards(JwtAuthGuard)
  @Post('get/code')
  async getCode(@Body() {Email}, @Request() {user}) {
    if(!Email)
    return new HttpException("Пустой Email!", 500);

    return this.apiService.createRegCode(Email, user?.ScoupeID);
  }
}

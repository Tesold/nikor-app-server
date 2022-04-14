import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles({ addUsers: true })
  @Post('/registration')
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllusers();
  }

  @Get('/:value')
  getUser(@Param('value') name: string) {
    return this.userService.getUserByName(name, true);
  }
}

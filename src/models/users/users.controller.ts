import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles('addUsers')
  @Post('/registration')
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllusers();
  }

  @Get('/:value')
  getUser(@Param('value') name: string) {
    return this.userService.getUserByName(name, true);
  }
}

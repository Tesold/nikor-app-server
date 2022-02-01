import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from 'src/tasks/tasks.model';
import { TaskToUser } from 'src/tasks/tasksToUsers.model';
import { Password } from './pass.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Password])
  ]
})
export class UsersModule {}

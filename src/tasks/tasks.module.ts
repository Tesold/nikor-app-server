import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksController } from './tasks.controller';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
import { TaskToDepartment } from './tasksToDepartments.model';
import { TaskToUser } from './tasksToUsers.model';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    SequelizeModule.forFeature([Task, TaskToUser, TaskToDepartment])
  ]
})
export class TasksModule {}

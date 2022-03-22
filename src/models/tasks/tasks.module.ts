import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksController } from './tasks.controller';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
import { TaskToDepartment } from './tasksToDepartments.model';
import { TaskToPosition } from './tasksToPositions.model';
import { TaskToUser } from './tasksToUsers.model';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    SequelizeModule.forFeature([Task, TaskToUser, TaskToDepartment, TaskToPosition])
  ]
})
export class TasksModule {}

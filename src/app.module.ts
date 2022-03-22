import {CacheModule, Module} from "@nestjs/common"
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Password } from "./models/users/pass.model";
import { User } from "./models/users/users.model";
import { UsersModule } from './models/users/users.module';
import { TasksModule } from './models/tasks/tasks.module';
import { TaskToUser } from "./models/tasks/tasksToUsers.model";
import { Task } from "./models/tasks/tasks.model";
import { PositionsModule } from './models/positions/positions.module';
import { TaskToDepartment } from "./models/tasks/tasksToDepartments.model";
import { Position } from "./models/positions/positions.model";
import { PositionName } from "./models/positions/positionsName.model";
import { Department } from "./models/positions/department.model";
import { Scoupe } from "./models/positions/scoupes.model";
import { PermissionsModule } from './models/permissions/permissions.module';
import { Permission } from "./models/permissions/permissions.model";
import { TaskToPosition } from "./models/tasks/tasksToPositions.model";
import { Subordinate } from "./models/positions/subordinates.model";
import { AuthModule } from './auth/auth.module';
import { UserPermissions } from "./models/permissions/UsersPermissions";
import { BlackList } from "./models/users/black-list.model";
import { ApiModule } from './api/api.module';

@Module(
    {
        controllers: [],
        providers: [],
        imports: [
          CacheModule.register(),
          ConfigModule.forRoot(
            {
              envFilePath: `.${process.env.NODE_ENV}.env`
            }
          ),
            SequelizeModule.forRoot({
              dialect: 'postgres',
              host: process.env.POSTGRES_HOST,
              port: Number(process.env.POSTGRES_PORT),
              username: process.env.POSTGRES_NAME,
              password: process.env.POSTGRES_PASS,
              database: process.env.POSTGRES_DB,
              models: [BlackList, UserPermissions, User, Password, Task, TaskToUser, TaskToDepartment, Position, PositionName, Department, Scoupe, Permission, TaskToPosition, Subordinate],
              autoLoadModels: true,
              synchronize: true,
              sync: { alter: true}
            }),
            UsersModule,
            TasksModule,
            PositionsModule,
            PermissionsModule,
            AuthModule,
            ApiModule,
          ],
    }
)
export class AppModule{}
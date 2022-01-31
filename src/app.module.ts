import {Module} from "@nestjs/common"
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Password } from "./users/pass.model";
import { User } from "./users/users.model";
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TaskToUser } from "./tasks/tasksToUsers.model";
import { Task } from "./tasks/tasks.model";

@Module(
    {
        controllers: [],
        providers: [],
        imports: [
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
              models: [User, Password, Task, TaskToUser],
              autoLoadModels: true,
              synchronize: true,
              sync: { force: true }
            }),
            UsersModule,
            TasksModule,
          ],
    }
)
export class AppModule{}
import {
  Model,
  Table,
  Column,
  DataType,
  HasOne,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Permission } from 'src/models/permissions/permissions.model';
import { Position } from 'src/models/positions/positions.model';
import { Task } from 'src/models/tasks/tasks.model';
import { TaskToDepartment } from 'src/models/tasks/tasksToDepartments.model';
import { TaskToUser } from 'src/models/tasks/tasksToUsers.model';
import { GeneralPosition } from '../positions/generalpositions.model';
import { Scoupe } from '../positions/scoupes.model';
import { Password } from './pass.model';

interface UserCreationInterface {
  Email: string;
  FirstName: string;
  LastName: string;
  Nickname: string;
  Birthday: Date;
  Timezone: number;
}

@Table({ tableName: 'Users' })
export class User extends Model<User, UserCreationInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  ID: number;

  @Column({ type: DataType.TEXT, unique: true, allowNull: false })
  Nickname: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  FirstName: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  LastName: string;

  @Column({ type: DataType.TEXT, allowNull: true, defaultValue: null })
  MiddleName: string;

  @Column({ type: DataType.DATE, allowNull: false })
  Birthday: Date;

  @Column({ type: DataType.INTEGER })
  Timezone: number;

  @Column({ type: DataType.TEXT, unique: true, allowNull: false })
  Email: string;

  @ForeignKey(() => Password)
  @Column({ type: DataType.INTEGER })
  PassID: number;

  @ForeignKey(() => Scoupe)
  @Column({ type: DataType.INTEGER })
  ScoupeID: number;

  @ForeignKey(() => Permission)
  @Column({ type: DataType.INTEGER })
  PermissionID: number;

  @BelongsTo(() => Permission)
  Permission: Permission;

  @HasMany(() => TaskToUser)
  TaskToUserID: TaskToUser;

  @HasMany(() => Task)
  TaskID: Task;

  @HasMany(() => TaskToDepartment)
  TaskToDepartmentID: TaskToDepartment;

  @BelongsTo(() => Password)
  Password: Password;

  @BelongsTo(() => Scoupe)
  Scoupe: Scoupe;

  @HasOne(() => Position)
  Position: Position;

  @HasOne(() => GeneralPosition)
  GeneralPosition: GeneralPosition;
}

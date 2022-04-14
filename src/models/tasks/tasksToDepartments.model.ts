import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Department } from 'src/models/positions/department.model';
import { User } from 'src/models/users/users.model';
import { Task } from './tasks.model';

interface TaskToDepartmentCreationInterface {
  DepartmentID: number;
  TaskID: number;
}

@Table({ tableName: 'TasksToDepartments' })
export class TaskToDepartment extends Model<
  TaskToDepartment,
  TaskToDepartmentCreationInterface
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  ID: number;

  @ForeignKey(() => Department)
  @Column({ type: DataType.INTEGER })
  DepartmentID: number;
  @BelongsTo(() => Department)
  Department: Department;

  @ForeignKey(() => Task)
  @Column({ type: DataType.INTEGER })
  TaskID: number;
  @BelongsTo(() => Task)
  Task: Task;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  ProducerID: number;
  @BelongsTo(() => User)
  Producer: User;
}

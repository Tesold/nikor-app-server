import {
  Model,
  Column,
  DataType,
  HasMany,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/models/users/users.model';

@Table({ tableName: 'Permissions' })
export class Permission extends Model<Permission> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  ID: number;

  @Column({ type: DataType.TEXT, unique: true })
  Name: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  addUsers: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  deleteUsers: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  editUsers: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  manageTasks: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  departmentTasks: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  editUsersPassword: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  manageScoupes: boolean;
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  managePositions: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  managePositionNames: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  manageDepartment: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  manageGeneralPositions: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  managment: boolean;

  @HasMany(()=>User)
  User:User;
}

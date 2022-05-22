import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Department } from './department.model';
import { ScoupeGeneralPosition } from './scoupegeneralpositions.model';

interface ScoupeCreationInterface {
  ScoupeName: string;
}

@Table({ tableName: 'Scoupes' })
export class Scoupe extends Model<Scoupe, ScoupeCreationInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  ID: number;

  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  ScoupeName: string;

  @HasMany(() => Department, { onDelete: 'cascade' })
  DepartmentID: Department[];

  @HasMany(() => ScoupeGeneralPosition, { onDelete: 'cascade' })
  ScoupeGeneralPosition: ScoupeGeneralPosition[];

  @HasMany(()=>User)
  User: User[];
}

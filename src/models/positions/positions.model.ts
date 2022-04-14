import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { PositionName } from 'src/models/positions/positionsName.model';
import { User } from '../users/users.model';
import { Subordinate } from './subordinates.model';

@Table({ tableName: 'Positions' })
export class Position extends Model<Position> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  ID: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  PositionCode: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true , unique: true})
  UserID: number;
  @BelongsTo(() => User)
  User: User;

  @ForeignKey(() => PositionName)
  @Column({ type: DataType.INTEGER, allowNull: false })
  PositionNameID: number;
  @BelongsTo(() => PositionName)
  PositionName: PositionName;
}

import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/models/users/users.model';

@Table({ tableName: 'BlackList' })
export class BlackList extends Model<BlackList> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  ID: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: true })
  UserID: number;

  @BelongsTo(() => User)
  User: User;
}

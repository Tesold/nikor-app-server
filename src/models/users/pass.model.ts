import { Model, Table, Column, DataType, HasOne } from 'sequelize-typescript';
import { User } from './users.model';

interface PasswordCreationInterface {
  PassHash: string;
  Salt: string;
}

@Table({ tableName: 'PT' })
export class Password extends Model<Password, PasswordCreationInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  ID: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  PassHash: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  Salt: string;

  @HasOne(() => User, { onDelete: 'cascade' })
  User: User;
}

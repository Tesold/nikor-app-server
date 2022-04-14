import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import { User } from '../users/users.model';
  
  @Table({ tableName: 'GeneralPositions' })
  export class GeneralPosition extends Model<GeneralPosition> {
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    ID: number;
  
    @Column({ type: DataType.TEXT, allowNull: false })
    GeneralPositionName: string;
  
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: true })
    UserID: number;
    @BelongsTo(() => User)
    User: User;
  }
  
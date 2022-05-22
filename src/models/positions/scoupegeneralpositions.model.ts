import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import { User } from '../users/users.model';
import { Scoupe } from './scoupes.model';
  
  @Table({ tableName: 'ScoupeGeneralPositions' })
  export class ScoupeGeneralPosition extends Model<ScoupeGeneralPosition> {
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    ID: number;
  
    @Column({ type: DataType.TEXT, allowNull: false, unique: true})
    ScoupeGeneralPositionName: string;
  
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: true })
    UserID: number;
    @BelongsTo(() => User)
    User: User;

    @ForeignKey(()=> Scoupe)
    @Column({type: DataType.INTEGER, allowNull: false})
    ScoupeID: number;

    @BelongsTo(()=>Scoupe)
    Scoupe: Scoupe;
  }
  
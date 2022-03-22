import { Model, Table, Column, DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Position } from "./positions.model";

@Table({tableName: 'Subordinates'})
export class Subordinate extends Model<Subordinate>
{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    ID: Number;

    @ForeignKey(()=>Position)
    @Column({type: DataType.INTEGER, allowNull: false, unique: true})
    PositionID: number;

    @ForeignKey(()=>Position)
    @Column({type: DataType.INTEGER, allowNull: true})
    ObeyTo: number;
}
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Position } from "src/positions/positions.model";
import { Department } from "./department.model";
import { Scoupe } from "./scoupes.model";

interface PositionNameCreationInterface
{
    PositionName:string;
}

@Table({tableName: 'PositionsNames'})
export class PositionName extends Model<PositionName, PositionNameCreationInterface>
{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    ID: Number;

    @Column({type: DataType.TEXT, allowNull: false})
    PositionName: string;

    @ForeignKey(()=>Department)
    @Column({type: DataType.INTEGER, allowNull: true})
    DepartmentID: number;

    @BelongsTo(()=>Department)
    Department:Department;

    @HasMany(()=>Position)
    PositionID: Position

}
import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";
import { PositionName } from "./positionsName.model";
import { Scoupe } from "./scoupes.model";

interface DepartmentCreationInterface
{
    DepartmentName:string;
}

@Table({tableName: 'Departments'})
export class Department extends Model<Department, DepartmentCreationInterface>
{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    ID: Number;

    @Column({type: DataType.TEXT, allowNull: false})
    DepartmentName: string;

    @ForeignKey(()=>Scoupe)
    @Column({type: DataType.INTEGER, allowNull: false})
    ScoupeID: number;

    @HasMany(()=>PositionName)
    PositionName:PositionName;

    @BelongsTo(()=>Scoupe)
    Scoupe:Scoupe;
}
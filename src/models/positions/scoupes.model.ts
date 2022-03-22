import { Model, Table, Column, DataType, HasMany} from "sequelize-typescript";
import { Department } from "./department.model";

interface ScoupeCreationInterface
{
    ScoupeName:string;
}

@Table({tableName: 'Scoupes'})
export class Scoupe extends Model<Scoupe, ScoupeCreationInterface>
{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    ID: Number;

    @Column({type: DataType.TEXT, allowNull: false, unique: true})
    ScoupeName: string;

    @HasMany(()=>Department, {onDelete: "cascade"})
    DepartmentID:Department[];
}
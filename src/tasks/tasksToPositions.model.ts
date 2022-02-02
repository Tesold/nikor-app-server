import { Model, Table, Column, DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Position } from "src/positions/positions.model";
import { User } from "src/users/users.model";
import { Task } from "./tasks.model";

interface TaskToPositionCreationInterface
{
    PositionID: number
    TaskID: number
    ProducerID: number
}

@Table({tableName: 'TasksToPositions'})
export class TaskToPosition extends Model<TaskToPosition, TaskToPositionCreationInterface>
{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    ID: number

    @ForeignKey(()=>Position)
    @Column({type: DataType.INTEGER})
    PositionID: number
    @BelongsTo(()=>Position)
    Position: Position;
    
    @ForeignKey(()=>Task)
    @Column({type: DataType.INTEGER})
    TaskID: number
    @BelongsTo(()=>Task)
    Task:Task;

    @ForeignKey(()=>User)
    @Column({type: DataType.INTEGER})
    ProducerID: number
    @BelongsTo(()=>User)
    Producer:User;
}
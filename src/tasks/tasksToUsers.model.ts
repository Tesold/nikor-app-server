import { Model, Table, Column, DataType, HasOne, ForeignKey, BelongsTo} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Task } from "./tasks.model";


interface TaskToUserCreationInterface
{
    UserID: number
    TaskID: number
}

@Table({tableName: 'TasksToUsers'})
export class TaskToUser extends Model<TaskToUser, TaskToUserCreationInterface>
{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    ID: number

    @ForeignKey(()=>User)
    @Column({type: DataType.INTEGER})
    UserID: number

    @BelongsTo(()=>User)
    User:User;
    
    @ForeignKey(()=>Task)
    @Column({type: DataType.INTEGER})
    TaskID: number

    @BelongsTo(()=>Task)
    Task:Task;
}
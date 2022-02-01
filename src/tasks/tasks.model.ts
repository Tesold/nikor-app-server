import { Model, Table, Column, DataType, HasOne, ForeignKey, BelongsTo} from "sequelize-typescript";
import { User } from "src/users/users.model";


interface TaskCreationInterface
{
    TaskName: string
    StartTime: Date
}

@Table({tableName: 'Tasks'})
export class Task extends Model<Task, TaskCreationInterface>
{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    ID: number

    @Column({type: DataType.TEXT})
    TaskName: string

    @Column({type: DataType.JSON})
    TaskJS: JSON

    @Column({type: DataType.BOOLEAN, defaultValue: null, allowNull: true})
    IsComplited: boolean

    @Column({type: DataType.BOOLEAN, defaultValue: false, allowNull: false})
    IsChosen: boolean

    @Column({type: DataType.TIME, allowNull: false})
    StartTime: Date

    @Column({type: DataType.TIME, allowNull: true, defaultValue: null})
    EndTime: Date

    @Column({type: DataType.TIME, allowNull: true, defaultValue: null})
    CompliteTime: Date

    @Column({type: DataType.TIME, allowNull: true, defaultValue: null})
    IsRequirementsComplited: boolean

    @ForeignKey(()=>User)
    @Column({type: DataType.INTEGER})
    ProducerID: number

    @BelongsTo(()=>User)
    Producer: User
}
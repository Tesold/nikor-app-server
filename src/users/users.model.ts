import { Model, Table, Column, DataType, HasOne, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";
import { TaskToUser } from "src/tasks/tasksToUsers.model";
import { Password } from "./pass.model";


interface UserCreationInterface
{
    Email:string;
    FirstName: string;
    LastName: string;
    Nickname: string;
    Birthday: Date;
    Timezone: number;
}

@Table({tableName: 'Users'})
export class User extends Model<User, UserCreationInterface>
{
    
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    ID: number;

    @Column({type: DataType.TEXT, unique: true, allowNull: false})
    Nickname: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    FirstName: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    LastName: string;

    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: null})
    MiddleName: string;

    @Column({type: DataType.DATE, allowNull: false})
    Birthday: Date;

    @Column({type: DataType.INTEGER})
    Timezone: number;

    @Column({type: DataType.TEXT, allowNull: false})
    Email: string;

    @ForeignKey(()=>Password)
    @Column({type: DataType.INTEGER})
    PassID: Number;

    @HasMany(()=>TaskToUser)
    TaskToUserID: TaskToUser
    

    /*@BelongsTo(()=>Password)
    Password: Password;*/

    /*@ForeignKey(()=>User)
    @Column({type: DataType.INTEGER})
    AddedBy: Number;

    @ForeignKey(()=>Permission)
    @Column({type: DataType.INTEGER})
    PermissionID: Number;*/
}
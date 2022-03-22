import { Model, Column, DataType, HasMany, Table, ForeignKey } from "sequelize-typescript";
import { User } from "src/models/users/users.model";
import { Permission } from "./permissions.model";

@Table({tableName: 'UsersPermissions'})
export class UserPermissions extends Model<UserPermissions>
{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    ID: number;

    @ForeignKey(() => User)
    @Column({type: DataType.NUMBER})
    UserID: Number;

    @ForeignKey(()=> Permission)
    @Column({type: DataType.NUMBER})
    PermissionID: Number;
}
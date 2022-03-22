import { Model, Column, DataType, HasMany, Table, BelongsToMany } from "sequelize-typescript";
import { User } from "src/models/users/users.model";
import { text } from "stream/consumers";
import { UserPermissions } from "./UsersPermissions";

@Table({tableName: 'Permissions'})
export class Permission extends Model<Permission>
{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    ID: number;

    @Column({type: DataType.TEXT, unique: true})
    Name: string;

    @Column({type: DataType.JSONB})
    Config: JSON;

    @BelongsToMany(() => User, ()=>UserPermissions)
    UserID: User[];
}
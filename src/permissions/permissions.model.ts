import { Model, Column, DataType, HasMany, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

@Table({tableName: 'Permissions'})
export class Permission extends Model<Permission>
{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    ID: number;

    @Column({type: DataType.JSON})
    Config: JSON;

    @HasMany(() => User)
    UserID: User;
}
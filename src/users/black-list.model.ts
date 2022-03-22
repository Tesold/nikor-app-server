import { Model, Column, DataType, HasMany, Table, ForeignKey, HasOne, BelongsToMany, BelongsTo} from "sequelize-typescript";
import { User } from "src/users/users.model";

@Table({tableName: 'BlackList'})
export class BlackList extends Model<BlackList>
{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    ID: Number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique: true})
    UserID: Number;

    @BelongsTo(()=>User)
    User: User;
}
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Child from './Child.model';
import Client from '../Client/Client.model';

@Table({
    tableName: 'Children-parents',
    createdAt: false,
    updatedAt: false
})
export default class ChildrenParents extends Model<ChildrenParents> {

    @Column({ type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true })
    id: number;
    @ForeignKey(() => Client)
    @Column({ type: DataType.STRING })
    clientID: string;
    @ForeignKey(() => Child)
    @Column({ type: DataType.STRING })
    childID: string;
}

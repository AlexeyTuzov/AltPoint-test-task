import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import ChildCreationAttr from './Child.interface';
import Client from '../Client/Client.model';
import ChildrenParents from './Children-Parents.model';
import * as uuid from 'uuid';

@Table({ tableName: 'Children' })
export default class Child extends Model<Child, ChildCreationAttr> {

    @Column({ type: DataType.STRING, primaryKey: true, unique: true, defaultValue: uuid.v4() })
    id: string;
    @Column({ type: DataType.STRING, allowNull: true })
    name: string;
    @Column({ type: DataType.STRING, allowNull: true })
    surname: string;
    @Column({ type: DataType.STRING, allowNull: true })
    patronymic: string;
    @Column({ type: DataType.DATEONLY, allowNull: true })
    dob: string;

    @BelongsToMany(() => Client, () => ChildrenParents)
    parents: Client[];
}

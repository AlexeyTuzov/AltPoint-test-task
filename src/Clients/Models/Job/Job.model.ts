import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import JobCreationAttr from './Job.interface';
import AddressModel from '../Address/Address.model';
import Client from '../Client/Client.model';
import * as uuid from 'uuid';

@Table({ tableName: 'jobs' })
export default class Job extends Model<Job, JobCreationAttr> {

    @Column({ type: DataType.STRING, primaryKey: true, defaultValue: uuid.v4() })
    //@Column({ type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true })
    id: string;
    @Column({ type: DataType.ENUM('main', 'part-time'), allowNull: true })
    type: string;
    @Column({ type: DataType.DATE, allowNull: true })
    dateEmp: string;
    @Column({ type: DataType.DATE, allowNull: true })
    dateDismissal: string;
    @Column({ type: DataType.FLOAT, allowNull: true })
    monIncome: number;
    @Column({ type: DataType.STRING, allowNull: true })
    tin: string;
    @ForeignKey(() => AddressModel)
    @Column({ type: DataType.STRING, allowNull: true })
    factAddressID: string;
    @ForeignKey(() => AddressModel)
    @Column({ type: DataType.STRING, allowNull: true })
    jurAddressID: string;
    @Column({ type: DataType.STRING, allowNull: true })
    phoneNumber: string;

    @BelongsTo(() => Client)
    client: Client;
    @ForeignKey(() => Client)
    @Column({ type: DataType.STRING, allowNull: false })
    clientID: string;
}

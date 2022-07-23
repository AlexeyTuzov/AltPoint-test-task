import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import AddressCreationAttr from './Address.interface';
import Job from '../Job/Job.model';
import Client from '../Client/Client.model';
import * as uuid from 'uuid';

@Table({ tableName: 'Addresses' })
export default class Address extends Model<Address, AddressCreationAttr> {

    @Column({ type: DataType.STRING, primaryKey: true, unique: true, defaultValue: uuid.v4() })
    id: string;
    @Column({ type: DataType.STRING, allowNull: true })
    zipCode: string;
    @Column({ type: DataType.STRING, allowNull: true })
    country: string;
    @Column({ type: DataType.STRING, allowNull: true })
    region: string;
    @Column({ type: DataType.STRING, allowNull: true })
    city: string;
    @Column({ type: DataType.STRING, allowNull: true })
    street: string;
    @Column({ type: DataType.STRING, allowNull: true })
    house: string;
    @Column({ type: DataType.STRING, allowNull: true })
    apartment: string;

    @BelongsTo(() => Job)
    job: Job;
    @ForeignKey(() => Job)
    @Column({ type: DataType.STRING, allowNull: true })
    jobID: string;

    @BelongsTo(() => Client)
    client: Client;
    @ForeignKey(() => Client)
    @Column({ type: DataType.STRING, allowNull: true })
    clientID: string;
}

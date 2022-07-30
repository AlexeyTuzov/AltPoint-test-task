import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import AddressCreationAttr from './Address.interface';
import Job from '../Job/Job.model';
import * as uuid from 'uuid';

@Table({ tableName: 'Fact Addresses' })
export default class FactAddress extends Model<FactAddress, AddressCreationAttr> {

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
    @Column({ type: DataType.STRING, allowNull: false })
    jobID: string;
}

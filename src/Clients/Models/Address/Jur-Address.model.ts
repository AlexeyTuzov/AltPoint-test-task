import { BelongsTo, Column, DataType, DefaultScope, ForeignKey, Model, Table } from 'sequelize-typescript';
import AddressCreationAttr from './Address.interface';
import Job from '../Job/Job.model';
import * as uuid from 'uuid';

@DefaultScope(() => ({
    attributes: [
        'id',
        'zipCode',
        'country',
        'region',
        'city',
        'street',
        'house',
        'apartment',
        'createdAt',
        'updatedAt'
    ]
}))
@Table({ tableName: 'Jur Addresses' })
export default class JurAddress extends Model<JurAddress, AddressCreationAttr> {

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
    @Column({ type: DataType.STRING, allowNull: false, onDelete: 'cascade' })
    jobID: string;
}

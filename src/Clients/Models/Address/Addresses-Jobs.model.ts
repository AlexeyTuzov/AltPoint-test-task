import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Address from './Address.model';
import Job from '../Job/Job.model';

@Table({
    tableName: 'Addresses-jobs',
    createdAt: false,
    updatedAt: false
})
export default class AddressesJobs extends Model<AddressesJobs> {

    @Column({ type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true })
    id: number;
    @ForeignKey(() => Address)
    @Column({ type: DataType.STRING })
    AddressID: string;
    @ForeignKey(() => Job)
    @Column({ type: DataType.STRING })
    JobID: string;
}

import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasOne,
    Model,
    Table
} from 'sequelize-typescript';
import JobCreationAttr from './Job.interface';
import Client from '../Client/Client.model';
import * as uuid from 'uuid';
import FactAddress from '../Address/Fact-Address.model';
import JurAddress from '../Address/Jur-Address.model';

@Table({ tableName: 'Jobs' })
export default class Job extends Model<Job, JobCreationAttr> {

    @Column({ type: DataType.STRING, primaryKey: true, defaultValue: uuid.v4() })
    id: string;
    @Column({ type: DataType.ENUM('main', 'part-time'), allowNull: true })
    type: string;
    @Column({ type: DataType.DATEONLY, allowNull: true })
    dateEmp: string;
    @Column({ type: DataType.DATEONLY, allowNull: true })
    dateDismissal: string;
    @Column({ type: DataType.FLOAT, allowNull: true })
    monIncome: number;
    @Column({ type: DataType.STRING, allowNull: true })
    tin: string;
    @Column({ type: DataType.STRING, allowNull: true })
    phoneNumber: string;

    @BelongsTo(() => Client)
    client: Client;
    @ForeignKey(() => Client)
    @Column({ type: DataType.STRING, allowNull: false })
    clientID: string;

    @HasOne(() => FactAddress)
    factAddress: FactAddress;
    @HasOne(() => JurAddress)
    jurAddress: JurAddress;
}

import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import ClientCreationAttr from './Client.interface';
import Child from '../Child/Child.model';
import ChildrenParents from '../Child/Children-Parents.model';
import Passport from '../Passport/Passport.model';
import Address from '../Address/Address.model';
import Job from '../Job/Job.model';
import Communication from '../Communication/Communication.model';
import * as uuid from 'uuid';
import AddressesClients from '../Address/Addresses-Clients.model';

@Table({ tableName: 'Clients' })
export default class Client extends Model<Client, ClientCreationAttr> {

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
    @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
    documentIds: string[];
    @Column({ type: DataType.INTEGER, allowNull: true })
    curWorkExp: number;
    @Column({
        type: DataType.ENUM(
            'secondary', 'secondarySpecial', 'incompleteHigher', 'higher', 'twoOrMoreHigher', 'academicDegree'),
        allowNull: true
    })
    typeEducation: string;
    @Column({ type: DataType.FLOAT, allowNull: true })
    monIncome: number;
    @Column({ type: DataType.FLOAT, allowNull: true })
    monExpenses: number;
    @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
    deletedAt: string;

    @BelongsToMany(() => Child, () => ChildrenParents)
    children: Child[];
    @HasOne(() => Passport)
    passport: Passport;
    @BelongsToMany(() => Address, () => AddressesClients)
    livingAddress: Address;
    @BelongsToMany(() => Address, () => AddressesClients)
    regAddress: Address;
    @HasMany(() => Job)
    jobs: Job[];
    @HasMany(() => Communication)
    communications: Communication[];
}

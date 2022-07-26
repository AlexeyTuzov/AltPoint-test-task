import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Client from '../Client/Client.model';
import Address from './Address.model';

@Table({
    tableName: 'Addresses-clients',
    createdAt: false,
    updatedAt: false
})
export default class AddressesClients extends Model<AddressesClients> {

    @Column({ type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true })
    id: number;
    @ForeignKey(() => Client)
    @Column({ type: DataType.STRING })
    clientID: string;
    @ForeignKey(() => Address)
    @Column({ type: DataType.STRING })
    addressID: string;
}

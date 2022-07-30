import { BelongsTo, Column, DataType, DefaultScope, ForeignKey, Model, Table } from 'sequelize-typescript';
import AddressCreationAttr from './Address.interface';
import Client from '../Client/Client.model';
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
@Table({ tableName: 'Reg Addresses' })
export default class RegAddress extends Model<RegAddress, AddressCreationAttr> {

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

    @BelongsTo(() => Client)
    client: Client;
    @ForeignKey(() => Client)
    @Column({type: DataType.STRING, allowNull: false})
    clientID: string;
}

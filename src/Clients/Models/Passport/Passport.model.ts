import { BelongsTo, Column, DataType, DefaultScope, ForeignKey, Model, Table } from 'sequelize-typescript';
import PassportCreationAttr from './Passport.interface';
import Client from '../Client/Client.model';
import * as uuid from 'uuid';

@DefaultScope(() => ({
    attributes: [
        'id',
        'series',
        'number',
        'giver',
        'dateIssued',
        'createdAt',
        'updatedAt'
    ]
}))
@Table({ tableName: 'Passports' })
export default class Passport extends Model<Passport, PassportCreationAttr> {

    @Column({ type: DataType.STRING, primaryKey: true, unique: true, defaultValue: uuid.v4() })
    id: string;
    @Column({ type: DataType.STRING, allowNull: false })
    series: string;
    @Column({ type: DataType.STRING, allowNull: false })
    number: string;
    @Column({ type: DataType.STRING, allowNull: false })
    giver: string;
    @Column({ type: DataType.DATEONLY, allowNull: false })
    dateIssued: string;

    @BelongsTo(() => Client)
    client: Client;
    @ForeignKey(() => Client)
    @Column({ type: DataType.STRING, allowNull: false })
    clientID: string;
}

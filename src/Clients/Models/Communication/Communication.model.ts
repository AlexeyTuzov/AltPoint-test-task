import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import CommunicationCreationAttr from './Communication.interface';
import Client from '../Client/Client.model';
import * as uuid from 'uuid';

@Table({ tableName: 'Communications' })
export default class Communication extends Model<Communication, CommunicationCreationAttr> {

    @Column({ type: DataType.STRING, primaryKey: true, unique: true, defaultValue: uuid.v4() })
    id: string;
    @Column({ type: DataType.ENUM('email', 'phone'), allowNull: false })
    type: string;
    @Column({ type: DataType.STRING, allowNull: false })
    value: string;

    @BelongsTo(() => Client)
    client: Client;
    @ForeignKey(() => Client)
    @Column({ type: DataType.STRING, allowNull: false })
    clientID: string;
}

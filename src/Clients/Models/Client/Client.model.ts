import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType, DefaultScope,
    ForeignKey,
    HasMany,
    HasOne,
    Model, Scopes,
    Table
} from 'sequelize-typescript';
import ClientCreationAttr from './Client.interface';
import Child from '../Child/Child.model';
import ChildrenParents from '../Child/Children-Parents.model';
import Passport from '../Passport/Passport.model';
import Job from '../Job/Job.model';
import Communication from '../Communication/Communication.model';
import * as uuid from 'uuid';
import LivingAddress from '../Address/Living-Address.model';
import RegAddress from '../Address/Reg-Address.model';

@DefaultScope(() => ({
    attributes: {
        exclude: ['spouseID', 'deletedAt']
    },
    include: [
        {
            model: Child,
            through: {
                attributes: []
            }
        },
        Passport,
        Communication,
        Job,
        LivingAddress,
        RegAddress
    ]
}))
@Scopes(() => ({
    includeAll: {
        include: {
            all: true
        }
    },
    notDeleted: {
        where: {
            deletedAt: null
        }
    }
}))
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
    @HasOne(() => LivingAddress)
    livingAddress: LivingAddress;
    @HasOne(() => RegAddress)
    regAddress: RegAddress;
    @HasMany(() => Job)
    jobs: Job[];
    @HasMany(() => Communication)
    communications: Communication[];
    @BelongsTo(() => Client, {})
    spouse: Client;
    @ForeignKey(() => Client)
    @Column({ type: DataType.STRING, allowNull: true })
    spouseID: string;
}

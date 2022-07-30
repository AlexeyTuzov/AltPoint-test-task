import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Child from './Clients/Models/Child/Child.model';
import Client from './Clients/Models/Client/Client.model';
import Communication from './Clients/Models/Communication/Communication.model';
import Job from './Clients/Models/Job/Job.model';
import Passport from './Clients/Models/Passport/Passport.model';
import ChildrenParents from './Clients/Models/Child/Children-Parents.model';
import { ClientsModule } from './Clients/Modules/clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import LivingAddress from './Clients/Models/Address/Living-Address.model';
import RegAddress from './Clients/Models/Address/Reg-Address.model';
import FactAddress from './Clients/Models/Address/Fact-Address.model';
import JurAddress from './Clients/Models/Address/Jur-Address.model';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [
                Child,
                ChildrenParents,
                Client,
                Communication,
                Job,
                Passport,
                LivingAddress,
                RegAddress,
                FactAddress,
                JurAddress
            ],
            autoLoadModels: true
        }),
        ClientsModule
    ]
})
export class AppModule {
}

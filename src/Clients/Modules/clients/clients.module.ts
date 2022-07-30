import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsController } from './clients.controller';
import Child from '../../Models/Child/Child.model';
import Client from '../../Models/Client/Client.model';
import ChildrenParents from '../../Models/Child/Children-Parents.model';
import Communication from '../../Models/Communication/Communication.model';
import Job from '../../Models/Job/Job.model';
import Passport from '../../Models/Passport/Passport.model';
import { PassportModule } from '../passport/passport.module';
import { AddressModule } from '../address/address.module';
import { JobsModule } from '../jobs/jobs.module';
import { ChildModule } from '../child/child.module';
import { CommunicationModule } from '../communication/communication.module';
import LivingAddress from '../../Models/Address/Living-Address.model';
import RegAddress from '../../Models/Address/Reg-Address.model';
import FactAddress from '../../Models/Address/Fact-Address.model';
import JurAddress from '../../Models/Address/Jur-Address.model';

@Module({
    providers: [ClientsService],
    controllers: [ClientsController],
    imports: [
        SequelizeModule.forFeature([
            Client,
            Child,
            ChildrenParents,
            Communication,
            Job,
            Passport,
            LivingAddress,
            RegAddress,
            FactAddress,
            JurAddress
        ]),
        PassportModule,
        AddressModule,
        JobsModule,
        ChildModule,
        CommunicationModule
    ],
    exports: [
        ClientsService
    ]
})
export class ClientsModule {
}

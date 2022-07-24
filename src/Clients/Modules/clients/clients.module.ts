import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsController } from './clients.controller';
import Address from '../../Models/Address/Address.model';
import Child from '../../Models/Child/Child.model';
import Client from '../../Models/Client/Client.model';
import ChildrenParents from '../../Models/Child/Children-Parents.model';
import Communication from '../../Models/Communication/Communication.model';
import Job from '../../Models/Job/Job.model';
import Passport from '../../Models/Passport/Passport.model';
import { PassportService } from '../passport/passport.service';
import { PassportModule } from '../passport/passport.module';
import { AddressModule } from '../address/address.module';
import { AddressService } from '../address/address.service';
import { JobsModule } from '../jobs/jobs.module';
import { JobsService } from '../jobs/jobs.service';
import { ChildModule } from '../child/child.module';
import { ChildService } from '../child/child.service';
import { CommunicationService } from '../communication/communication.service';
import { CommunicationModule } from '../communication/communication.module';

@Module({
    providers: [ClientsService,
        PassportService,
        AddressService,
        JobsService,
        ChildService,
        CommunicationService],
    controllers: [ClientsController],
    imports: [
        SequelizeModule.forFeature([Address, Child, ChildrenParents, Client, Communication, Job, Passport]),
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

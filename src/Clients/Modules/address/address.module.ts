import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Address from '../../Models/Address/Address.model';
import AddressesClients from '../../Models/Address/Addresses-Clients.model';
import AddressesJobs from '../../Models/Address/Addresses-Jobs.model';
import Job from '../../Models/Job/Job.model';
import Client from '../../Models/Client/Client.model';

@Module({
    providers: [AddressService],
    imports: [
        SequelizeModule.forFeature([Address, Client, Job, AddressesClients, AddressesJobs])
    ],
    exports: [AddressService]
})
export class AddressModule {
}

import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Job from '../../Models/Job/Job.model';
import { AddressService } from '../address/address.service';
import { AddressModule } from '../address/address.module';
import Address from '../../Models/Address/Address.model';
import AddressesJobs from '../../Models/Address/Addresses-Jobs.model';

@Module({
    providers: [JobsService, AddressService],
    imports: [
        SequelizeModule.forFeature([Job, Address, AddressesJobs]),
        AddressModule
    ],
    exports: [JobsService]
})
export class JobsModule {
}

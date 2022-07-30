import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Job from '../../Models/Job/Job.model';
import { AddressService } from '../address/address.service';
import { AddressModule } from '../address/address.module';
import FactAddress from '../../Models/Address/Fact-Address.model';
import JurAddress from '../../Models/Address/Jur-Address.model';
import LivingAddress from '../../Models/Address/Living-Address.model';
import RegAddress from '../../Models/Address/Reg-Address.model';

@Module({
    providers: [JobsService, AddressService],
    imports: [
        SequelizeModule.forFeature([Job, FactAddress, JurAddress, LivingAddress, RegAddress]),
        AddressModule
    ],
    exports: [JobsService]
})
export class JobsModule {
}

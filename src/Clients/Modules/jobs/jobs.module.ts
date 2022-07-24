import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Job from '../../Models/Job/Job.model';
import { AddressService } from '../address/address.service';
import { AddressModule } from '../address/address.module';

@Module({
    providers: [JobsService, AddressService],
    imports: [
        SequelizeModule.forFeature([Job]),
        AddressModule
    ],
    exports: [JobsService]
})
export class JobsModule {
}

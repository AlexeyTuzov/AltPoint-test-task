import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Job from '../../Models/Job/Job.model';
import Client from '../../Models/Client/Client.model';
import LivingAddress from '../../Models/Address/Living-Address.model';
import RegAddress from '../../Models/Address/Reg-Address.model';
import FactAddress from '../../Models/Address/Fact-Address.model';
import JurAddress from '../../Models/Address/Jur-Address.model';

@Module({
    providers: [AddressService],
    imports: [
        SequelizeModule.forFeature([LivingAddress, RegAddress, FactAddress, JurAddress, Client, Job])
    ],
    exports: [AddressService]
})
export class AddressModule {
}

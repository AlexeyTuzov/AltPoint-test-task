import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Address from '../../Models/Address/Address.model';

@Module({
    providers: [AddressService],
    imports: [
        SequelizeModule.forFeature([Address])
    ],
    exports: [AddressService]
})
export class AddressModule {
}

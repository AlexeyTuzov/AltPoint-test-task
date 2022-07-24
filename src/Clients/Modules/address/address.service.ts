import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Address from '../../Models/Address/Address.model';
import CreateAddressDto from './DTO/create-address.dto';

@Injectable()
export class AddressService {

    constructor(@InjectModel(Address) private addressRepository: typeof Address) {
    }

    async createAddress(dto: CreateAddressDto) {
        return await this.addressRepository.create(dto);
    }
}

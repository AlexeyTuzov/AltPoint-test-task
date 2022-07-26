import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Address from '../../Models/Address/Address.model';
import CreateAddressDto from './DTO/create-address.dto';
import * as uuid from 'uuid';

@Injectable()
export class AddressService {

    constructor(@InjectModel(Address) private addressRepository: typeof Address) {
    }

    async createAddress(dto: CreateAddressDto) {
        const generatedID = uuid.v4();
        return await this.addressRepository.create({ ...dto, id: generatedID });
    }
}

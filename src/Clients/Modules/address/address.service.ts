import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import CreateAddressDto, { addressType } from './DTO/create-address.dto';
import * as uuid from 'uuid';
import LivingAddress from '../../Models/Address/Living-Address.model';
import RegAddress from '../../Models/Address/Reg-Address.model';
import FactAddress from '../../Models/Address/Fact-Address.model';
import JurAddress from '../../Models/Address/Jur-Address.model';

@Injectable()
export class AddressService {

    constructor(@InjectModel(LivingAddress) private livingAddressRepository: typeof LivingAddress,
                @InjectModel(RegAddress) private regAddressRepository: typeof RegAddress,
                @InjectModel(FactAddress) private factAddressRepository: typeof FactAddress,
                @InjectModel(JurAddress) private jurAddressRepository: typeof JurAddress) {
    }

    async createAddress(dto: CreateAddressDto) {
        const generatedID = uuid.v4();
        switch (dto.addressType) {

            case addressType.FACT_ADDRESS :
                return await this.factAddressRepository.create({ ...dto, id: generatedID });

            case addressType.JUR_ADDRESS :
                return await this.jurAddressRepository.create({ ...dto, id: generatedID });

            case addressType.LIVING_ADDRESS :
                return await this.livingAddressRepository.create({ ...dto, id: generatedID });

            case addressType.REG_ADDRESS :
                return await this.regAddressRepository.create({ ...dto, id: generatedID });
        }
    }
}

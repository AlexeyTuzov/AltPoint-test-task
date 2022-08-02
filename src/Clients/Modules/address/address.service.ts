import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import CreateAddressDto, { addressTypes } from './DTO/create-address.dto';
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

            case addressTypes.FACT_ADDRESS :
                return await this.factAddressRepository.create({ ...dto, id: generatedID });

            case addressTypes.JUR_ADDRESS :
                return await this.jurAddressRepository.create({ ...dto, id: generatedID });

            case addressTypes.LIVING_ADDRESS :
                return await this.livingAddressRepository.create({ ...dto, id: generatedID });

            case addressTypes.REG_ADDRESS :
                return await this.regAddressRepository.create({ ...dto, id: generatedID });
        }
    }

    async updateAddress(dto: CreateAddressDto | null,
                        addressType: addressTypes,
                        clientID?: string,
                        jobID?: string) {

        if (dto === null) {
            switch (addressType) {

                case addressTypes.LIVING_ADDRESS:
                    return await this.livingAddressRepository.destroy({ where: { clientID } });

                case addressTypes.REG_ADDRESS:
                    return await this.regAddressRepository.destroy({ where: { clientID } });

                case addressTypes.FACT_ADDRESS:
                    return await this.factAddressRepository.destroy({ where: { jobID } });

                case addressTypes.JUR_ADDRESS:
                    return await this.jurAddressRepository.destroy({ where: { jobID } });
            }
        }
        let isAddressExist;
        switch (addressType) {

            case addressTypes.LIVING_ADDRESS:
                isAddressExist = await this.livingAddressRepository.findOne({ where: { clientID } });
                break;

            case addressTypes.REG_ADDRESS:
                isAddressExist = await this.regAddressRepository.findOne({ where: { clientID } });
                break;

            case addressTypes.FACT_ADDRESS:
                isAddressExist = await this.factAddressRepository.findOne({ where: { jobID } });
                break;

            case addressTypes.JUR_ADDRESS:
                isAddressExist = await this.jurAddressRepository.findOne({ where: { jobID } });
                break;
        }
        if (!isAddressExist) {
            return await this.createAddress({ ...dto, addressType, clientID, jobID });
        } else {
            switch (addressType) {

                case addressTypes.LIVING_ADDRESS:
                    return await this.livingAddressRepository.update({ ...dto },
                        { where: { clientID } });

                case addressTypes.REG_ADDRESS:
                    return await this.regAddressRepository.update({ ...dto },
                        { where: { clientID } });

                case addressTypes.FACT_ADDRESS:
                    return await this.factAddressRepository.update({ ...dto },
                        { where: { jobID } });

                case addressTypes.JUR_ADDRESS:
                    return await this.jurAddressRepository.update({ ...dto },
                        { where: { jobID } });
            }
        }
    }
}

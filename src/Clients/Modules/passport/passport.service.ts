import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Passport from '../../Models/Passport/Passport.model';
import CreatePassportDto from './DTO/create-passport.dto';
import * as uuid from 'uuid';

@Injectable()
export class PassportService {

    constructor(@InjectModel(Passport) private passportRepository: typeof Passport) {
    }

    async createPassport(dto: CreatePassportDto) {

        const generatedID = uuid.v4();
        return await this.passportRepository.create({ ...dto, id: generatedID });
    }

    async updatePassport(dto: CreatePassportDto | null, clientID: string) {

        if (dto === null) {
            return await this.passportRepository.destroy({ where: { clientID } });
        }
        const isPassportExist = await this.passportRepository.findOne({ where: { clientID } });
        if (!isPassportExist) {
            return await this.createPassport({ ...dto, clientID });
        } else {
            return await this.passportRepository.update({ ...dto }, {
                where: { clientID }
            });
        }
    }
}

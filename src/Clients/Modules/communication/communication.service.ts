import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Communication from '../../Models/Communication/Communication.model';
import CreateCommunicationDto from './DTO/create-communication.dto';
import * as uuid from 'uuid';

@Injectable()
export class CommunicationService {

    constructor(@InjectModel(Communication) private communicationRepository: typeof Communication) {
    }

    async createCommunication(dto: CreateCommunicationDto) {
        const generatedID = uuid.v4();
        return await this.communicationRepository.create({ ...dto, id: generatedID });
    }
}

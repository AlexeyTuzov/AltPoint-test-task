import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Communication from '../../Models/Communication/Communication.model';
import CreateCommunicationDto from './DTO/create-communication.dto';

@Injectable()
export class CommunicationService {

    constructor(@InjectModel(Communication) private communicationRepository: typeof Communication) {
    }

    async createCommunication(dto: CreateCommunicationDto) {
        return await this.communicationRepository.create(dto);
    }
}

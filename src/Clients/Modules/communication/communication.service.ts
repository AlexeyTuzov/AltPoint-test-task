import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Communication from '../../Models/Communication/Communication.model';
import CreateCommunicationDto, { UpdateCommunicationDto } from './DTO/create-communication.dto';
import * as uuid from 'uuid';
import Client from '../../Models/Client/Client.model';

@Injectable()
export class CommunicationService {

    constructor(@InjectModel(Communication) private communicationRepository: typeof Communication) {
    }

    async createCommunication(dto: CreateCommunicationDto) {

        const generatedID = uuid.v4();
        return await this.communicationRepository.create({ ...dto, id: generatedID });
    }

    async updateCommunications(dto: UpdateCommunicationDto[] | null, clientID: string) {

        if (dto === null) {
            return;
        }

        let existingCommunications = await this.communicationRepository.findAll({
            include: [{
                model: Client,
                where: { id: clientID }
            }]
        });
        for await (let comm of existingCommunications) {
            if (!dto.find(item => item.id === comm.id)) {
                await comm.destroy();
            }
        }

        for await (let comm of dto) {
            if (comm.id) {
                const existingComm = await this.communicationRepository.findByPk(comm.id);
                await existingComm.update({ ...comm });
            } else {
                await this.createCommunication({ ...comm, clientID });
            }
        }
        return;
    }
}

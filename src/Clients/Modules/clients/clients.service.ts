import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Client from '../../Models/Client/Client.model';
import CreateClientDto from './DTO/create-client.dto';
import UpdateClientDto from './DTO/update-client.dto';
import { PassportService } from '../passport/passport.service';
import { AddressService } from '../address/address.service';
import { JobsService } from '../jobs/jobs.service';
import { ChildService } from '../child/child.service';
import { CommunicationService } from '../communication/communication.service';

@Injectable()
export class ClientsService {

    constructor(@InjectModel(Client) private clientRepository: typeof Client,
                private passportService: PassportService,
                private addressService: AddressService,
                private jobsService: JobsService,
                private childService: ChildService,
                private communicationService: CommunicationService) {
    }

    async getAllClients() {
        return await this.clientRepository.findAll({ where: { deletedAt: null } });
    }

    async createClient(dto: CreateClientDto) {
        const newClient = await this.clientRepository.create(dto);

        if (dto.passport) {
            await this.passportService.createPassport({ ...dto.passport, clientID: newClient.id });
        }
        if (dto.livingAddress) {
            await this.addressService.createAddress({ ...dto.livingAddress, clientID: newClient.id });
        }
        if (dto.regAddress) {
            await this.addressService.createAddress({ ...dto.regAddress, clientID: newClient.id });
        }
        if (dto.jobs && dto.jobs.length > 0) {
            for (let job of dto.jobs) {
                await this.jobsService.createJob({ ...job, clientID: newClient.id });
            }
        }
        if (dto.children && dto.children.length > 0) {
            for (let child of dto.children) {
                let newChild = await this.childService.createChild({ ...child });
                await newChild.$add('parents', newClient.id);
            }
        }
        if (dto.communications && dto.communications.length > 0) {
            for (let comm of dto.communications) {
                await this.communicationService.createCommunication({ ...comm, clientID: newClient.id});
            }
        }

        return newClient.id;
    }

    async getClientWithSpouse(id: string) {
        return await this.clientRepository.findByPk(id);
    }

    async updateClient(id: string, dto: UpdateClientDto) {
        const client = await this.clientRepository.findByPk(id);
        //TODO: update with dto
    }

    async softDeleteClient(id: string) {
        const client = await this.clientRepository.findByPk(id);
        client.deletedAt = Date.now().toString();
        return;
    }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Client from '../../Models/Client/Client.model';
import CreateClientDto from './DTO/create-client.dto';
import UpdateClientDto from './DTO/update-client.dto';
import { PassportService } from '../passport/passport.service';
import { AddressService } from '../address/address.service';
import { JobsService } from '../jobs/jobs.service';
import { ChildService } from '../child/child.service';
import { CommunicationService } from '../communication/communication.service';
import * as uuid from 'uuid';
import { addressType } from '../address/DTO/create-address.dto';


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
        return await this.clientRepository.findAll({ where: { deletedAt: null }, include: { all: true } });
    }

    async createClient(dto: CreateClientDto) {

        try {
            const generatedID = uuid.v4();
            const newClient = await this.clientRepository.create({ ...dto, id: generatedID });

            if (dto.passport) {
                await this.passportService.createPassport({ ...dto.passport, clientID: newClient.id });
            }
            if (dto.livingAddress) {
                await this.addressService.createAddress({
                    ...dto.livingAddress,
                    clientID: newClient.id,
                    addressType: addressType.LIVING_ADDRESS
                });
            }
            if (dto.regAddress) {
                await this.addressService.createAddress(
                    {
                        ...dto.regAddress,
                        clientID: newClient.id,
                        addressType: addressType.REG_ADDRESS
                    }
                );
            }
            if (dto.jobs && dto.jobs.length > 0) {
                for (let job of dto.jobs) {
                    console.log('job creation new Client ID:', newClient.id);
                    await this.jobsService.createJob({ ...job, clientID: newClient.id });
                }
            }
            if (dto.children && dto.children.length > 0) {
                for (let child of dto.children) {
                    let newChild = await this.childService.createChild({ ...child });
                    await newChild.$add('parents', newClient.id);
                    await newClient.$add('children', newChild.id);
                }
            }
            if (dto.communications && dto.communications.length > 0) {
                for (let comm of dto.communications) {
                    await this.communicationService.createCommunication({ ...comm, clientID: newClient.id });

                }
            }
            if (dto)
                return newClient.id;
        } catch (err) {
            console.log(err);
            throw new HttpException({
                'status': HttpStatus.INTERNAL_SERVER_ERROR,
                'code': 'INTERNAL_SERVER_ERROR'
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getClientWithSpouse(id: string) {
        try {
            let foundUser = await this.clientRepository.findByPk(id, { include: { all: true } });
            if (!foundUser) {
                throw new HttpException({
                    'status': HttpStatus.NOT_FOUND,
                    'code': 'ENTITY_NOT_FOUND'
                }, HttpStatus.NOT_FOUND);
            } else {
                return foundUser;
            }
        } catch (err) {
            throw new HttpException({
                'status': HttpStatus.INTERNAL_SERVER_ERROR,
                'code': 'INTERNAL_SERVER_ERROR'
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

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

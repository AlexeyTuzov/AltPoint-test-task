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
import { addressTypes } from '../address/DTO/create-address.dto';
import HttpExceptionServerError from '../../Exceptions/HttpExceptionServerError';
import HttpExceptionNotFound from '../../Exceptions/HttpExceptionNotFound';
import SearchClientsDto from './DTO/search-clients.dto';
import { Order, Op } from 'sequelize';

@Injectable()
export class ClientsService {

    constructor(@InjectModel(Client) private clientRepository: typeof Client,
                private passportService: PassportService,
                private addressService: AddressService,
                private jobsService: JobsService,
                private childService: ChildService,
                private communicationService: CommunicationService) {
    }

    async getAllClients(dto: SearchClientsDto) {

        try {
            const sortBy = dto.sortBy || 'createdAt';
            let order: Order = [[`${sortBy}`, 'ASC']];
            if (dto.sortDir && dto.sortDir === 'desc') {
                order = [[`${sortBy}`, 'DESC']];
            }
            let offset = +dto.limit * (dto.page - 1);
            if (!offset || offset < 0) offset = 0;

            const searchConditions = dto.search ?
                {
                    deletedAt: null,
                    [sortBy]: {
                        [Op.like]: `%${dto.search}%`
                    }
                } : { deletedAt: null }

            const findParams = {
                where: searchConditions,
                offset,
                limit: dto.limit,
                order
            }
            const count = await this.clientRepository.scope('notDeleted').count({ ...findParams });
            const rows = await this.clientRepository.findAll({ ...findParams });
            return {
                limit: dto.limit,
                page: dto.page,
                total: count,
                data: [...rows]
            };

        } catch (err) {
            HttpExceptionServerError();
        }
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
                    addressType: addressTypes.LIVING_ADDRESS
                });
            }
            if (dto.regAddress) {
                await this.addressService.createAddress(
                    {
                        ...dto.regAddress,
                        clientID: newClient.id,
                        addressType: addressTypes.REG_ADDRESS
                    }
                );
            }
            if (dto.jobs && dto.jobs.length > 0) {
                for (let job of dto.jobs) {
                    await this.jobsService.createJob({ ...job, clientID: newClient.id });
                }
            }
            if (dto.children && dto.children.length > 0) {
                for await (let child of dto.children) {
                    let newChild = await this.childService.checkIfChildExist({ ...child });
                    if (!newChild) {
                        newChild = await this.childService.createChild({ ...child });
                    }
                    await newChild.$add('parents', newClient.id);
                    await newClient.$add('children', newChild.id);
                }
            }
            if (dto.communications && dto.communications.length > 0) {
                for await (let comm of dto.communications) {
                    await this.communicationService.createCommunication({ ...comm, clientID: newClient.id });
                }
            }
            if (dto)
                return newClient.id;
        } catch (err) {
            HttpExceptionServerError();
        }
    }

    async getClientWithSpouse(id: string) {

        try {
            let client = await this.clientRepository.scope('includeAll').findByPk(id);
            if (client) {
                return client;
            } else {
                return HttpExceptionNotFound();
            }
        } catch (err) {
            HttpExceptionServerError();
        }

    }

    async updateClient(id: string, dto: UpdateClientDto) {

        try {
            const client = await this.clientRepository.scope('includeAll').findByPk(id);
            if (client) {
                for (let key in dto) {
                    if (dto.hasOwnProperty(key)) {
                        await this.clientRepository.update({ [key]: dto[key] }, { where: { id } });
                        switch (key) {

                            case 'passport':
                                await this.passportService.updatePassport(dto[key], client.id);
                                break;

                            case 'livingAddress':
                                await this.addressService.updateAddress(dto[key],
                                    addressTypes.LIVING_ADDRESS,
                                    client.id);
                                break;

                            case 'regAddress':
                                await this.addressService.updateAddress(dto[key],
                                    addressTypes.REG_ADDRESS,
                                    client.id);
                                break;

                            case 'communications':
                                await this.communicationService.updateCommunications(dto[key], client.id);
                                break;

                            case 'children':
                                await this.childService.updateChildren(dto[key], client.id);
                                break;

                            case 'jobs':
                                await this.jobsService.updateJobs(dto[key], client.id);
                                break;

                            case 'spouse':
                                if (dto[key] === null) {
                                    client.spouseID = null;
                                    await client.save();
                                    break;
                                }
                                if (client.spouseID) {
                                    await this.updateClient(client.spouseID, dto[key]);
                                    break;
                                } else {
                                    client.spouseID = await this.createClient(dto[key]);
                                    break;
                                }

                            default:
                                break;
                        }
                    }
                }
                return new HttpException({
                    'status': HttpStatus.NO_CONTENT,
                    'code': 'Client data successfully updated!'
                }, HttpStatus.NO_CONTENT).getResponse();
            } else {
                return HttpExceptionNotFound();
            }
        } catch (err) {
            HttpExceptionServerError();
        }
    }

    async softDeleteClient(id: string) {

        try {
            const client = await this.clientRepository.scope('includeAll').findByPk(id);
            if (client) {
                client.deletedAt = new Date().toDateString();
                await client.save();
                return new HttpException({
                    'status': HttpStatus.NO_CONTENT,
                    'code': 'Client softly deleted!'
                }, HttpStatus.NO_CONTENT).getResponse();
            } else {
                return HttpExceptionNotFound();
            }
        } catch (err) {
            HttpExceptionServerError();
        }
    }
}

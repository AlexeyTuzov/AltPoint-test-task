import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Client from '../../../Models/Client/Client.model';
import CreateClientDto from '../DTO/create-client.dto';
import { PassportService } from '../../passport/passport.service';
import { AddressService } from '../../address/address.service';
import { JobsService } from '../../jobs/jobs.service';
import { ChildService } from '../../child/child.service';
import { CommunicationService } from '../../communication/communication.service';
import * as uuid from 'uuid';
import { addressTypes } from '../../address/DTO/create-address.dto';
import HttpExceptionServerError from '../../../Exceptions/HttpExceptionServerError';

@Injectable()
export class CreateClientService {

    constructor(@InjectModel(Client) private clientRepository: typeof Client,
                private passportService: PassportService,
                private addressService: AddressService,
                private jobsService: JobsService,
                private childService: ChildService,
                private communicationService: CommunicationService) {
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
}

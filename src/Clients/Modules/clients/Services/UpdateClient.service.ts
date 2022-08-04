import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Client from '../../../Models/Client/Client.model';
import UpdateClientDto from '../DTO/update-client.dto';
import { PassportService } from '../../passport/passport.service';
import { AddressService } from '../../address/address.service';
import { JobsService } from '../../jobs/jobs.service';
import { ChildService } from '../../child/child.service';
import { CommunicationService } from '../../communication/communication.service';
import { addressTypes } from '../../address/DTO/create-address.dto';
import HttpExceptionServerError from '../../../Exceptions/HttpExceptionServerError';
import HttpExceptionNotFound from '../../../Exceptions/HttpExceptionNotFound';
import { CreateClientService } from './CreateClient.service';

@Injectable()
export class UpdateClientService {

    constructor(@InjectModel(Client) private clientRepository: typeof Client,
                private passportService: PassportService,
                private addressService: AddressService,
                private jobsService: JobsService,
                private childService: ChildService,
                private communicationService: CommunicationService,
                private createClientService: CreateClientService) {
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
                                    client.spouseID = await this.createClientService.createClient(dto[key]);
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
}

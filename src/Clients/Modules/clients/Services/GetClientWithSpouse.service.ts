import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Client from '../../../Models/Client/Client.model';
import HttpExceptionServerError from '../../../Exceptions/HttpExceptionServerError';
import HttpExceptionNotFound from '../../../Exceptions/HttpExceptionNotFound';

@Injectable()
export class GetClientWithSpouseService {

    constructor(@InjectModel(Client) private clientRepository: typeof Client) {
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
}

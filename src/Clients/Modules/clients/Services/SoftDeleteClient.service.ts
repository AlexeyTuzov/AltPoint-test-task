import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Client from '../../../Models/Client/Client.model';
import HttpExceptionServerError from '../../../Exceptions/HttpExceptionServerError';
import HttpExceptionNotFound from '../../../Exceptions/HttpExceptionNotFound';

@Injectable()
export class SoftDeleteClientService {

    constructor(@InjectModel(Client) private clientRepository: typeof Client) {
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

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Client from '../../../Models/Client/Client.model';
import HttpExceptionServerError from '../../../Exceptions/HttpExceptionServerError';
import SearchClientsDto from '../DTO/search-clients.dto';
import { Order, Op } from 'sequelize';

@Injectable()
export class GetAllClientsService {

    constructor(@InjectModel(Client) private clientRepository: typeof Client) {
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
}

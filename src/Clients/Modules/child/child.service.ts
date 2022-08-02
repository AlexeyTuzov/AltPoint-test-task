import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Child from '../../Models/Child/Child.model';
import CreateChildDto from './DTO/create-child.dto';
import * as uuid from 'uuid';
import Client from '../../Models/Client/Client.model';

@Injectable()
export class ChildService {

    constructor(@InjectModel(Child) private childRepository: typeof Child,
                @InjectModel(Client) private clientRepository: typeof Client) {
    }

    async createChild(dto: CreateChildDto) {

        const generatedID = uuid.v4();
        return await this.childRepository.create({ ...dto, id: generatedID });
    }

    async checkIfChildExist(dto: CreateChildDto) {

        return await this.childRepository.findOne({ where: { ...dto } });
    }

    async updateChildren(dto: CreateChildDto[] | null, clientID: string) {

        let existingChildren = await this.childRepository.findAll({
            include: [{
                model: Client,
                where: { id: clientID }
            }]
        });
        for await (let child of existingChildren) {
            await child.$remove('parents', clientID);
            const anotherParent = await this.clientRepository.findOne({
                include: [{
                    model: Child,
                    where: { id: child.id }
                }]
            });
            if (!anotherParent) {
                await child.destroy();
            }
        }
        if (dto === null) {
            return;
        }
        for await (let child of dto) {
            const newChild = await this.createChild({ ...child });
            await newChild.$add('parents', clientID);
        }
    }
}

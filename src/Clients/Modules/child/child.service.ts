import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Child from '../../Models/Child/Child.model';
import CreateChildDto, { UpdateChildDto } from './DTO/create-child.dto';
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

    async updateChildren(dto: UpdateChildDto[] | null, clientID: string) {

        if (dto === null) {
            return;
        }

        // Child will be fully deleted from DB only in case he has no more links to another Client
        let existingChildren = await this.childRepository.findAll({
            include: [{
                model: Client,
                where: { id: clientID }
            }]
        });
        for await (let child of existingChildren) {
            if (!dto.find(item => item.id === child.id)) {
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
        }

        for await (let child of dto) {
            if (child.id) {
                const existingChild = await this.childRepository.findByPk(child.id);
                await existingChild.update({ ...child });
            } else {
                const newChild = await this.createChild({ ...child });
                await newChild.$add('parents', clientID);
            }
        }
        return;
    }
}

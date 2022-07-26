import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Child from '../../Models/Child/Child.model';
import CreateChildDto from './DTO/create-child.dto';
import * as uuid from 'uuid';

@Injectable()
export class ChildService {

    constructor(@InjectModel(Child) private childRepository: typeof Child) {
    }

    async createChild(dto: CreateChildDto) {
        const generatedID = uuid.v4();
        return await this.childRepository.create( { ...dto, id: generatedID});
    }

    async getAll() {
        return await this.childRepository.findAll({include: {all: true}})
    }

}

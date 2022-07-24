import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Child from '../../Models/Child/Child.model';
import CreateChildDto from './DTO/create-child.dto';

@Injectable()
export class ChildService {

    constructor(@InjectModel(Child) private childRepository: typeof Child) {
    }

    async createChild(dto: CreateChildDto) {
        return await this.childRepository.create(dto);
    }

}

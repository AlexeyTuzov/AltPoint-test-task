import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Job from '../../Models/Job/Job.model';
import { AddressService } from '../address/address.service';
import CreateJobDto from './DTO/create-job.dto';
import * as uuid from 'uuid';

@Injectable()
export class JobsService {

    constructor(@InjectModel(Job) private jobsRepository: typeof Job,
                private addressService: AddressService) {
    }

    async createJob(dto: CreateJobDto) {
        const generatedID = uuid.v4();
        const newJob = await this.jobsRepository.create({ ...dto, id: generatedID});
        if (dto.factAddress) {
            let newAddress = await this.addressService.createAddress({ ...dto.factAddress, jobID: newJob.id});
            await newJob.$add('factAddress', newAddress.id);
            await newAddress.$add('job', newJob.id);
        }
        if (dto.jurAddress) {
            let newAddress = await this.addressService.createAddress({ ...dto.jurAddress, jobID: newJob.id});
            await newJob.$add('jurAddress', newAddress.id);
            await newAddress.$add('job', newJob.id);
        }
        return newJob;
    }
}

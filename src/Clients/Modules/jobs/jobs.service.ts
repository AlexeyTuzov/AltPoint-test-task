import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Job from '../../Models/Job/Job.model';
import { AddressService } from '../address/address.service';
import CreateJobDto from './DTO/create-job.dto';
import * as uuid from 'uuid';
import { addressType } from '../address/DTO/create-address.dto';

@Injectable()
export class JobsService {

    constructor(@InjectModel(Job) private jobsRepository: typeof Job,
                private addressService: AddressService) {
    }

    async createJob(dto: CreateJobDto) {
        const generatedID = uuid.v4();
        const newJob = await this.jobsRepository.create({ ...dto, id: generatedID });
        if (dto.factAddress) {
            await this.addressService.createAddress(
                {
                    ...dto.factAddress,
                    jobID: newJob.id,
                    addressType: addressType.FACT_ADDRESS
                }
            );
        }
        if (dto.jurAddress) {
            await this.addressService.createAddress(
                {
                    ...dto.jurAddress,
                    jobID: newJob.id,
                    addressType: addressType.JUR_ADDRESS
                }
            );
        }
        return newJob;
    }
}

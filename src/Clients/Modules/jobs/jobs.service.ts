import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Job from '../../Models/Job/Job.model';
import { AddressService } from '../address/address.service';
import CreateJobDto from './DTO/create-job.dto';
import * as uuid from 'uuid';
import { addressTypes } from '../address/DTO/create-address.dto';

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
                    addressType: addressTypes.FACT_ADDRESS
                }
            );
        }
        if (dto.jurAddress) {
            await this.addressService.createAddress(
                {
                    ...dto.jurAddress,
                    jobID: newJob.id,
                    addressType: addressTypes.JUR_ADDRESS
                }
            );
        }
        return newJob;
    }

    async updateJobs(dto: CreateJobDto[], clientID: string) {

        try {
            await this.jobsRepository.destroy({ where: { clientID } });
            if (dto === null) {
                return;
            }
            for await (let job of dto) {
                await this.createJob({...job, clientID});
            }
        } catch (err) {
            console.log(err);
        }

    }
}

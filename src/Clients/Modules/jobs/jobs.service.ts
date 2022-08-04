import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Job from '../../Models/Job/Job.model';
import { AddressService } from '../address/address.service';
import CreateJobDto, { UpdateJobDto } from './DTO/create-job.dto';
import * as uuid from 'uuid';
import { addressTypes } from '../address/DTO/create-address.dto';
import Client from '../../Models/Client/Client.model';

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

    async updateJobs(dto: UpdateJobDto[], clientID: string) {

        if (dto === null) {
            return;
        }

        let existingJobs = await this.jobsRepository.findAll({
            include: [{
                model: Client,
                where: { id: clientID }
            }]
        });
        for await (let job of existingJobs) {
            if (!dto.find(item => item.id === job.id)) {
                await job.destroy();
            }
        }

        for await (let job of dto) {
            if (job.id) {
                const existingJob = await this.jobsRepository.findOne({
                    where: {id: job.id},
                    include: [{
                        model: Client,
                        where: { id: clientID }
                    }]
                });
                await existingJob.update({...job});
                await this.addressService.updateAddress(job.factAddress, addressTypes.FACT_ADDRESS, null, job.id);
                await this.addressService.updateAddress(job.jurAddress, addressTypes.JUR_ADDRESS, null, job.id);
            } else {
                await this.createJob({ ...job, clientID });
            }
        }
        return;
    }
}

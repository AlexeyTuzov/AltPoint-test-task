import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Job from '../../Models/Job/Job.model';

@Module({
  providers: [JobsService],
  imports: [
      SequelizeModule.forFeature([Job])
  ],
  exports: [JobsService]
})
export class JobsModule {}

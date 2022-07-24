import { Module } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Communication from '../../Models/Communication/Communication.model';

@Module({
  providers: [CommunicationService],
  imports: [
      SequelizeModule.forFeature([Communication])
  ],
  exports: [CommunicationService]
})
export class CommunicationModule {}

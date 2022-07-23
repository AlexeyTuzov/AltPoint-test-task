import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsController } from './clients.controller';
import Address from '../../Models/Address/Address.model';
import Child from '../../Models/Child/Child.model';
import Client from '../../Models/Client/Client.model';
import ChildrenParents from '../../Models/Child/Children-Parents.model';
import Communication from '../../Models/Communication/Communication.model';
import Job from '../../Models/Job/Job.model';
import Passport from '../../Models/Passport/Passport.model';

@Module({
  providers: [ClientsService],
  controllers: [ClientsController],
  imports: [
      SequelizeModule.forFeature([Address, Child, ChildrenParents, Client, Communication, Job, Passport])
  ],
  exports: [
      ClientsService
  ]
})
export class ClientsModule {}

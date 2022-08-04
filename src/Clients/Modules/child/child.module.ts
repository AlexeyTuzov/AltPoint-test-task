import { Module } from '@nestjs/common';
import { ChildService } from './child.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Child from '../../Models/Child/Child.model';
import Client from '../../Models/Client/Client.model';
import ChildrenParents from '../../Models/Child/Children-Parents.model';

@Module({
    providers: [ChildService],
    imports: [
        SequelizeModule.forFeature([Child, Client, ChildrenParents])
    ],
    exports: [ChildService]
})
export class ChildModule {
}

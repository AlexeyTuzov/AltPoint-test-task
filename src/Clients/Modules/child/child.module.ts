import { Module } from '@nestjs/common';
import { ChildService } from './child.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Child from '../../Models/Child/Child.model';

@Module({
    providers: [ChildService],
    imports: [
        SequelizeModule.forFeature([Child])
    ],
    exports: [ChildService]
})
export class ChildModule {
}

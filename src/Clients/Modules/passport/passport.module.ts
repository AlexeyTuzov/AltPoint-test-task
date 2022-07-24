import { Module } from '@nestjs/common';
import { PassportService } from './passport.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Passport from '../../Models/Passport/Passport.model';

@Module({
    providers: [PassportService],
    imports: [
        SequelizeModule.forFeature([Passport])
    ],
    exports: [PassportService]
})
export class PassportModule {}

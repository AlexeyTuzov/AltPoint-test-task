import { IsDateString, IsNumberString, IsString } from 'class-validator';

export default class CreatePassportDto {
    @IsNumberString()
    readonly series: string;
    @IsNumberString()
    readonly number: string;
    @IsString({message: 'Should be a string'})
    readonly giver: string;
    @IsDateString()
    readonly dateIssued: string;
    readonly clientID: string;
}

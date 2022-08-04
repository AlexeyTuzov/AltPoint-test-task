import { IsDateString, IsNumberString, IsString, Length } from 'class-validator';

export default class CreatePassportDto {
    @IsNumberString()
    @Length(4,4)
    readonly series: string;
    @IsNumberString()
    @Length(6,6)
    readonly number: string;
    @IsString({message: 'Should be a string'})
    readonly giver: string;
    @IsDateString()
    readonly dateIssued: string;
    readonly clientID: string;
}

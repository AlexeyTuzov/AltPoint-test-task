import { IsDateString, IsNumber, IsNumberString, IsString } from 'class-validator';

export default class CreateJobDto {
    @IsString({message: 'Should be a string'})
    readonly type: string;
    @IsDateString()
    readonly dateEmp: string;
    @IsDateString()
    readonly dateDismissal: string;
    @IsNumber({maxDecimalPlaces: 2})
    readonly monIncome: number;
    @IsNumberString()
    readonly tin: string;
    readonly factAddress: any;
    readonly jurAddress: any;
    @IsString({message: 'Should be a string'})
    readonly phoneNumber: string;
    readonly clientID: string;
}

export class UpdateJobDto extends CreateJobDto {
    readonly id?: string;
}

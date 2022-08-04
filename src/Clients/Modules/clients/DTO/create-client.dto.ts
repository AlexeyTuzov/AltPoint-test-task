import CreateChildDto from '../../child/DTO/create-child.dto';
import CreatePassportDto from '../../passport/DTO/create-passport.dto';
import CreateAddressDto from '../../address/DTO/create-address.dto';
import CreateJobDto from '../../jobs/DTO/create-job.dto';
import CreateCommunicationDto from '../../communication/DTO/create-communication.dto';
import { IsArray, IsDateString, IsDefined, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum EducationType {
    'secondary' = 'secondary',
    'secondarySpecial' = 'secondarySpecial',
    'incompleteHigher' = 'incompleteHigher',
    'higher' = 'higher',
    'twoOrMoreHigher' = 'twoOrMoreHigher',
    'academicDegree' = 'academicDegree'
}

export default class CreateClientDto {
    @IsString({ message: 'Should be a string' })
    readonly name: string;
    @IsString({ message: 'Should be a string' })
    readonly surname: string;
    @IsString({ message: 'Should be a string' })
    readonly patronymic: string;
    @IsDateString()
    readonly dob: string;
    @ValidateNested({ each: true })
    @Type(() => CreateChildDto)
    readonly children: CreateChildDto[];
    @IsDefined()
    @IsArray()
    readonly documentIds: string[];
    readonly passport: CreatePassportDto;
    readonly livingAddress: CreateAddressDto;
    readonly regAddress: CreateAddressDto;
    readonly jobs: CreateJobDto[];
    @IsEnum(EducationType)
    readonly typeEducation: EducationType;
    @IsNumber({ maxDecimalPlaces: 2 })
    readonly monIncome: number;
    @IsNumber({ maxDecimalPlaces: 2 })
    readonly monExpenses: number;
    readonly communications: CreateCommunicationDto[];
    readonly spouseID: string;
}

export class CreateClientWithSpouseDto extends CreateClientDto {
    readonly spouse?: CreateClientDto;
}

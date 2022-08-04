import CreateChildDto from '../../child/DTO/create-child.dto';
import CreatePassportDto from '../../passport/DTO/create-passport.dto';
import CreateAddressDto from '../../address/DTO/create-address.dto';
import CreateJobDto from '../../jobs/DTO/create-job.dto';
import CreateCommunicationDto from '../../communication/DTO/create-communication.dto';
import { EducationType } from './create-client.dto';
import { IsDateString, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export default class UpdateClientDto {
    @IsString({ message: 'Should be a string' })
    readonly name?: string;
    @IsString({ message: 'Should be a string' })
    readonly surname?: string;
    @IsString({ message: 'Should be a string' })
    readonly patronymic?: string;
    @IsDateString()
    readonly dob?: string;
    @ValidateNested({ each: true })
    @Type(() => CreateChildDto)
    readonly children?: CreateChildDto[];
    readonly documentIds?: string[];
    @ValidateNested()
    @Type(() => CreatePassportDto)
    readonly passport?: CreatePassportDto;
    @ValidateNested()
    @Type(() => CreateAddressDto)
    readonly livingAddress?: CreateAddressDto;
    @ValidateNested()
    @Type(() => CreateAddressDto)
    readonly regAddress?: CreateAddressDto;
    @ValidateNested({ each: true })
    @Type(() => CreateJobDto)
    readonly jobs?: CreateJobDto[];
    @IsEnum(EducationType)
    readonly typeEducation?: EducationType;
    @IsNumber({ maxDecimalPlaces: 2 })
    readonly monIncome?: number;
    @IsNumber({ maxDecimalPlaces: 2 })
    readonly monExpenses?: number;
    @ValidateNested({ each: true })
    @Type(() => CreateCommunicationDto)
    readonly communications?: CreateCommunicationDto[];
    readonly spouseID?: string;
}

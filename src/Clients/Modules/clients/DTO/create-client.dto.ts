import CreateChildDto from '../../child/DTO/create-child.dto';
import CreatePassportDto from '../../passport/DTO/create-passport.dto';
import CreateAddressDto from '../../address/DTO/create-address.dto';
import CreateJobDto from '../../jobs/DTO/create-job.dto';
import CreateCommunicationDto from '../../communication/DTO/create-communication.dto';

enum EducationType {
'secondary' = 'secondary',
'secondarySpecial' = 'secondarySpecial',
'incompleteHigher' = 'incompleteHigher',
'higher' = 'higher',
'twoOrMoreHigher' = 'twoOrMoreHigher',
'academicDegree' = 'academicDegree'
}

export default class CreateClientDto {
    readonly name: string;
    readonly surname: string;
    readonly patronymic: string;
    readonly dob: string;
    readonly children: CreateChildDto[];
    readonly documentIds: string[];
    readonly passport: CreatePassportDto;
    readonly livingAddress: CreateAddressDto;
    readonly regAddress: CreateAddressDto;
    readonly jobs: CreateJobDto[];
    readonly typeEducation: EducationType;
    readonly monIncome: number;
    readonly monExpenses: number;
    readonly communications: CreateCommunicationDto[];
}

import CreateAddressDto from '../../address/DTO/create-address.dto';

export default class CreateJobDto {
    readonly type: string;
    readonly dateEmp: string;
    readonly dateDismissal: string;
    readonly monIncome: number;
    readonly tin: string;
    readonly factAddress: CreateAddressDto;
    readonly jurAddress: CreateAddressDto;
    readonly phoneNumber: string;
    readonly clientID: string;
}

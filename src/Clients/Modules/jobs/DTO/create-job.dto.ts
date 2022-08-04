
export default class CreateJobDto {
    readonly type: string;
    readonly dateEmp: string;
    readonly dateDismissal: string;
    readonly monIncome: number;
    readonly tin: string;
    readonly factAddress: any;
    readonly jurAddress: any;
    readonly phoneNumber: string;
    readonly clientID: string;
}

export class UpdateJobDto extends CreateJobDto {
    readonly id?: string;
}

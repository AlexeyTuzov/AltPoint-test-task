export default class CreateChildDto {
    readonly name: string;
    readonly surname: string;
    readonly patronymic: string;
    readonly dob: string;
}

export class UpdateChildDto extends CreateChildDto {
    readonly id?: string;
}

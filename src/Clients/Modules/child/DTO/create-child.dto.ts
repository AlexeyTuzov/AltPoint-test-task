import { IsString, Matches } from 'class-validator';

export default class CreateChildDto {
    @IsString({message: 'Should be a string'})
    readonly name: string;
    @IsString({message: 'Should be a string'})
    readonly surname: string;
    @IsString({message: 'Should be a string'})
    readonly patronymic: string;
    @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
        {message: 'Should be in date format YYYY:MM:DD'})
    readonly dob: string;
}

export class UpdateChildDto extends CreateChildDto {
    readonly id?: string;
}

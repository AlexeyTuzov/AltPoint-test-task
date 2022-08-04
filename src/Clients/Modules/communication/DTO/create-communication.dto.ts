import { IsEnum, IsString } from 'class-validator';

enum Types {
    'email' = 'email',
    'phone' = 'phone'
}

export default class CreateCommunicationDto {
    @IsEnum(Types)
    readonly type: Types;
    @IsString({message: 'Should be a string'})
    readonly value: string;
    readonly clientID: string;
}

export class UpdateCommunicationDto extends CreateCommunicationDto {
    readonly id?: string;
}

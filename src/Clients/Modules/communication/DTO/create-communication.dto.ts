enum Types {
    'email' = 'email',
    'phone' = 'phone'
}

export default class CreateCommunicationDto {
    readonly type: Types;
    readonly value: string;
    readonly clientID: string;
}

export class UpdateCommunicationDto extends CreateCommunicationDto {
    readonly id?: string;
}

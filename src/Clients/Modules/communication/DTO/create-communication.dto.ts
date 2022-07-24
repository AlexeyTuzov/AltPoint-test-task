enum Types {
    'email' = 'email',
    'phone' = 'phone'
}

export default class CreateCommunicationDto {
    readonly type: Types;
    readonly value: string;
    readonly clientID: string;
}

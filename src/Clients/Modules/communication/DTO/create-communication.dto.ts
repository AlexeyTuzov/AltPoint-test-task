enum Types {
    'email' = 'email',
    'password' = 'password'
}

export default class CreateCommunicationDto {
    readonly type: Types;
    readonly value: string;
    readonly clientID: string;
}

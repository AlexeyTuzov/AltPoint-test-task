export default class CreateAddressDto {
    readonly zipCode: string;
    readonly country: string;
    readonly region: string;
    readonly city: string;
    readonly street: string;
    readonly house: string;
    readonly apartment: string;
    readonly jobID?: string;
    readonly clientID?: string;
}

import { IsNumberString, IsString, Length } from 'class-validator';

export enum addressTypes {
    LIVING_ADDRESS,
    REG_ADDRESS,
    FACT_ADDRESS,
    JUR_ADDRESS
}

export default class CreateAddressDto {
    @IsNumberString()
    @Length(6, 6, {message: 'zip-code length should be equal to 6'})
    readonly zipCode: string;
    @IsString({message: 'Should be a string'})
    readonly country: string;
    @IsString({message: 'Should be a string'})
    readonly region: string;
    @IsString({message: 'Should be a string'})
    readonly city: string;
    @IsString({message: 'Should be a string'})
    readonly street: string;
    @IsString({message: 'Should be a string'})
    readonly house: string;
    @IsString({message: 'Should be a string'})
    readonly apartment: string;
    readonly jobID?: string;
    readonly clientID?: string;
    readonly addressType: addressTypes;
}

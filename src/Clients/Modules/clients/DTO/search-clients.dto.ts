import { IsEnum, IsNumberString, IsString } from 'class-validator';

enum SortDirections {
    'asc' = 'asc',
    'desc' = 'desc'
}

export default class SearchClientsDto {

    @IsString({message: 'Should be a string'})
    readonly sortBy?: string;
    @IsEnum(SortDirections)
    readonly sortDir?: SortDirections;
    @IsNumberString()
    readonly limit?: number;
    @IsNumberString()
    readonly page?: number;
    @IsString({message: 'Should be a string'})
    readonly search?: string;
}

enum SortDirections {
    'asc' = 'asc',
    'desc' = 'desc'
}

export default class SearchClientsDto {
    readonly sortBy: string;
    readonly sortDir: SortDirections;
    readonly limit: number;
    readonly page: number;
    readonly search: string;
}

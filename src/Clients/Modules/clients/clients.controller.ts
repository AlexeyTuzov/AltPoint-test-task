import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import CreateClientDto, { CreateClientWithSpouseDto } from './DTO/create-client.dto';
import UpdateClientDto from './DTO/update-client.dto';
import SearchClientsDto from './DTO/search-clients.dto';

@Controller('clients')
export class ClientsController {

    constructor(private clientsService: ClientsService) {
    }

    @Get()
    getAllClients(@Query() dto: SearchClientsDto) {
        return this.clientsService.getAllClients(dto);
    }

    @Post()
    async createClient(@Body() dto: CreateClientWithSpouseDto) {

            if (dto.spouse) {
                let spouseID: string = await this.clientsService.createClient(dto.spouse);
                return this.clientsService.createClient({ ...dto, spouseID });
            }
            return this.clientsService.createClient(dto);
    }

    @Get('/:id')
    getClientWithSpouse(@Param('id') id: string) {
        return this.clientsService.getClientWithSpouse(id);
    }

    @Patch('/:id')
    updateClient(@Param('id') id: string, @Body() dto: UpdateClientDto) {
        return this.clientsService.updateClient(id, dto);
    }

    @Delete('/:id')
    softDeleteClient(@Param('id') id: string) {
        return this.clientsService.softDeleteClient(id);
    }
}

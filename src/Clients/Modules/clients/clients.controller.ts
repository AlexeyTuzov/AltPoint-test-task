import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import CreateClientDto from './DTO/create-client.dto';
import UpdateClientDto from './DTO/update-client.dto';

@Controller('clients')
export class ClientsController {

    constructor(private clientsService: ClientsService) {
    }

    @Get()
    getAllClients() {
        return this.clientsService.getAllClients();
    }

    @Post()
    createClient(@Body() dto: CreateClientDto) {
        return this.clientsService.createClient(dto);
    }

    @Get('/:id')
    getClientWithSpouse(@Param() id: string) {
        return this.clientsService.getClientWithSpouse(id);
    }

    @Patch('/:id')
    updateClient(@Param() id: string, @Body() dto: UpdateClientDto) {
        return this.clientsService.updateClient(id, dto);
    }

    @Delete('/:id')
    softDeleteClient(@Param() id: string) {
        return this.clientsService.softDeleteClient(id);
    }
}

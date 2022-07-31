import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import CreateClientDto, { CreateClientWithSpouseDto } from './DTO/create-client.dto';
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

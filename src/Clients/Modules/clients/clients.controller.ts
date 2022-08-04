import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateClientWithSpouseDto } from './DTO/create-client.dto';
import UpdateClientDto from './DTO/update-client.dto';
import SearchClientsDto from './DTO/search-clients.dto';
import { SoftDeleteClientService } from './Services/SoftDeleteClient.service';
import { CreateClientService } from './Services/CreateClient.service';
import { UpdateClientService } from './Services/UpdateClient.service';
import { GetClientWithSpouseService } from './Services/GetClientWithSpouse.service';
import { GetAllClientsService } from './Services/GetAllClients.service';

@Controller('clients')
export class ClientsController {

    constructor(private softDeleteClientService: SoftDeleteClientService,
                private createClientService: CreateClientService,
                private updateClientService: UpdateClientService,
                private getClientWithSpouseService: GetClientWithSpouseService,
                private getAllClientsService: GetAllClientsService) {
    }

    @Get()
    getAllClients(@Query() dto: SearchClientsDto) {
        return this.getAllClientsService.getAllClients(dto);
    }

    @Post()
    async createClient(@Body() dto: CreateClientWithSpouseDto) {

            if (dto.spouse) {
                let spouseID: string = await this.createClientService.createClient(dto.spouse);
                return this.createClientService.createClient({ ...dto, spouseID });
            }
            return this.createClientService.createClient(dto);
    }

    @Get('/:id')
    getClientWithSpouse(@Param('id') id: string) {
        return this.getClientWithSpouseService.getClientWithSpouse(id);
    }

    @Patch('/:id')
    updateClient(@Param('id') id: string, @Body() dto: UpdateClientDto) {
        return this.updateClientService.updateClient(id, dto);
    }

    @Delete('/:id')
    softDeleteClient(@Param('id') id: string) {
        return this.softDeleteClientService.softDeleteClient(id);
    }
}

import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { GenericPipe } from 'src/shared/pipes/generic.pipe';
import { LeadPatchRequestDTO } from '../../models/patch/request.dto';
import { LeadPatchResponseDTO } from '../../models/patch/response.dto';

import { LeadPostRequestDTO } from '../../models/post/request.dto';
import { LeadPostResponseDTO } from '../../models/post/response.dto';
import { LeadsService } from '../../services/leads/leads.service';
import { UUIDValidator } from '../../validators/patch/param.validator';
import { LeadPostValidator } from '../../validators/post/body.validator';

@ApiTags('v1/leads')
@Controller('v1/leads')
export class LeadsController {
  constructor(private leadsService: LeadsService) {}

  @Post()
  @ApiBody({ type: LeadPostRequestDTO })
  @ApiResponse({
    status: 201,
    type: LeadPostResponseDTO,
    description: 'Criação de Leads',
  })
  createLead(
    @Body(new GenericPipe<LeadPostRequestDTO>(new LeadPostValidator()))
    newLead: LeadPostRequestDTO,
  ): Observable<LeadPostResponseDTO> {
    return this.leadsService.create(newLead);
  }

  @Patch(':idLead')
  @ApiParam({
    name: 'idLead',
    required: true,
    example: '36718b0f-eeeb-413e-8081-9ab2748bd687',
  })
  @ApiBody({ type: LeadPatchRequestDTO })
  @ApiResponse({
    status: 201,
    type: LeadPatchResponseDTO,
    description: 'Atualização de Leads',
  })
  updateLead(
    @Param('idLead', new GenericPipe<string>(new UUIDValidator()))
    idLead: string,
    @Body(new GenericPipe<LeadPatchRequestDTO>(new LeadPostValidator()))
    idAgent: LeadPatchRequestDTO,
  ): Observable<LeadPatchResponseDTO> {
    return this.leadsService.update(idLead, idAgent);
  }
}

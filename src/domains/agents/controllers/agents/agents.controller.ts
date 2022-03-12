import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { HeaderWithPipe } from 'src/shared/decorators/headerWithPipe.decorator';

import { GenericPipe } from 'src/shared/pipes/generic.pipe';
import { AgentGetRequestDTO } from '../../models/get/request.dto';
import { AgentGetResponseDTO } from '../../models/get/response.dto';

import { AgentPostRequestDTO } from '../../models/post/request.dto';
import { AgentPostResponseDTO } from '../../models/post/response.dto';
import { AgentsService } from '../../services/agents/agents.service';
import { HeaderValidator } from '../../validators/get/header.validator';
import { AgentPostValidator } from '../../validators/post/body.validator';

@ApiTags('v1/agents')
@Controller('v1/agents')
export class AgentsController {
  constructor(private agentsService: AgentsService) {}

  @Post()
  @ApiBody({ type: AgentPostRequestDTO })
  @ApiResponse({
    status: 201,
    type: AgentPostResponseDTO,
    description: 'Criação do Vendedor',
  })
  createAgent(
    @Body(new GenericPipe<AgentPostRequestDTO>(new AgentPostValidator()))
    newAgent: AgentPostRequestDTO,
  ): Observable<AgentPostResponseDTO> {
    return this.agentsService.create(newAgent);
  }

  @Get()
  @ApiHeader({
    name: 'offset',
    description:
      'Número de vendedores a serem ignorados no resultado da busca a partir do começo do resultado.',
    example: '0',
    required: true,
  })
  @ApiHeader({
    name: 'limit',
    description: 'Número total de vendedores que a busca deve retornar',
    example: '30',
    required: true,
  })
  listAgents(
    @HeaderWithPipe(new GenericPipe<AgentGetRequestDTO>(new HeaderValidator()))
    headers: AgentGetRequestDTO,
  ): Observable<AgentGetResponseDTO> {
    return this.agentsService.read(headers);
  }
}

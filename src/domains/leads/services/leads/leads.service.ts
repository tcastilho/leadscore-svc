import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  catchError,
  forkJoin,
  from,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';

import { LeadEntity } from 'src/entities/lead.entity';
import { LeadMapperDTOToEntity } from '../../mappers/lead-dto-entity.mapper';
import { LeadPostRequestDTO } from '../../models/post/request.dto';
import { LeadPostResponseDTO } from '../../models/post/response.dto';
import { LeadPatchRequestDTO } from '../../models/patch/request.dto';
import { LeadPatchResponseDTO } from '../../models/patch/response.dto';
import { AgentsService } from 'src/domains/agents/services/agents/agents.service';

@Injectable()
export class LeadsService {
  constructor(private readonly agentsService: AgentsService) {}

  @InjectRepository(LeadEntity)
  private readonly leadRepository: Repository<LeadEntity>;

  /**
   * @description Gera novos Leads no banco de dados e retorna o ID, com a URL de acesso a eles
   *
   * @param {data: LeadPostRequestDTO}
   * @returns {Observable<LeadPostResponseDTO>}
   *
   * @author Thiago Castilho <tcastilho@outlook.com>
   */
  create(data: LeadPostRequestDTO): Observable<LeadPostResponseDTO> {
    const lead: LeadEntity = LeadMapperDTOToEntity(data);
    return from(this.leadRepository.save(lead)).pipe(
      map((savedAgent) => {
        return {
          id: savedAgent.id,
          url: `/v1/leads/${savedAgent.id}`,
          mensagem: 'Lead criado com sucesso.',
        };
      }),
      catchError(() => {
        throw new InternalServerErrorException();
      }),
    );
  }

  /**
   * @description Atualiza os Leads no banco de dados relacionando com o Vendedor de contato
   *
   * @param {id: string, data: LeadPatchRequestDTO}
   * @returns {Observable<LeadPatchResponseDTO>}
   *
   * @author Thiago Castilho <tcastilho@outlook.com>
   */
  update(
    id: string,
    data: LeadPatchRequestDTO,
  ): Observable<LeadPatchResponseDTO> {
    const insertAgent = {
      agentId: data.agentId,
    };
    const toUpdate: Promise<UpdateResult> = this.leadRepository.update(
      id,
      insertAgent,
    );

    return from(toUpdate).pipe(
      switchMap(() => {
        const toUpdate = this.agentsService.update(data.agentId);
        return forkJoin([of(), toUpdate]);
      }),
      map(() => {
        return {
          id: id,
          url: `/v1/leads/${id}`,
          mensagem: 'Lead atualizado com sucesso.',
        };
      }),
      catchError(() => {
        throw new NotFoundException();
      }),
    );
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { AgentEntity } from 'src/entities/agent.entity';
import { AgentPostRequestDTO } from '../../models/post/request.dto';
import { catchError, from, map, Observable, of } from 'rxjs';
import { AgentPostResponseDTO } from '../../models/post/response.dto';
import { AgentMapperDTOToEntity } from '../../mappers/agent-dto-entity.mapper';
import { AgentGetRequestDTO } from '../../models/get/request.dto';
import { AgentGetResponseDTO } from '../../models/get/response.dto';

@Injectable()
export class AgentsService {
  @InjectRepository(AgentEntity)
  private readonly agentRepository: Repository<AgentEntity>;

  /**
   * @description Gera novos Vendedores no banco de dados e retorna o ID, com a URL de acesso a eles
   *
   * @param {data: AgentPostRequestDTO}
   * @returns {Observable<AgentPostResponseDTO>}
   *
   * @author Thiago Castilho <tcastilho@outlook.com>
   */
  create(data: AgentPostRequestDTO): Observable<AgentPostResponseDTO> {
    const agent: AgentEntity = AgentMapperDTOToEntity(data);
    return from(this.agentRepository.save(agent)).pipe(
      map((savedAgent) => {
        return {
          id: savedAgent.id,
          url: `/v1/agents/${savedAgent.id}`,
          mensagem: 'Vendedor criado com sucesso.',
        };
      }),
      catchError(() => {
        throw new InternalServerErrorException();
      }),
    );
  }

  /**
   * @description Retorna toda a listagem de Notícias
   *
   * @param {data: AgentGetRequestDTO}
   * @returns {Observable<AgentGetResponseDTO>}
   *
   * @author Thiago Castilho <tcastilho@outlook.com>
   */
  read(data: AgentGetRequestDTO): Observable<AgentGetResponseDTO> {
    const agents: Promise<AgentEntity[]> = this.agentRepository.find({
      skip: data.offset,
      take: data.limit,
    });

    return from(agents).pipe(
      map((agentsList) => {
        const list = this.agentsScoreCalculation(agentsList);
        return {
          lista: [...list],
        };
      }),
      catchError(() => {
        throw new NotFoundException();
      }),
    );
  }

  /**
   * @description Atualiza o Vendedor com o tempo do último Lead
   *
   * @param {data: string}
   * @returns {Observable<null>}
   *
   * @author Thiago Castilho <tcastilho@outlook.com>
   */
  update(data: string): Observable<boolean> {
    const insertAgent = {
      ultimoLead: Date.now(),
    };
    const toUpdate: Promise<UpdateResult> = this.agentRepository.update(
      data,
      insertAgent,
    );

    return from(toUpdate).pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  /**
   * @description Realiza o cálculo da pontuação de cada vendedor, baseado em seu nível e o tempo do último lead
   *
   * @param {list: AgentEntity[]}
   * @returns {ordination: object}
   *
   * @author Thiago Castilho <tcastilho@outlook.com>
   */
  agentsScoreCalculation(list: AgentEntity[]) {
    const dateNow = Date.now();
    const calculation = list.map((item: AgentEntity) => {
      const dateLead = new Date(Number(item.ultimoLead));
      const elapsedTime: number = this.getBusinessHoursDiff(dateLead, dateNow);
      const score: number = parseFloat(
        Number(elapsedTime * item.multiplicador).toFixed(2),
      );
      const newItem = {
        nome: item.nome,
        nivel: item.nivel,
        ultimo_lead_recebido: new Date(Number(item.ultimoLead)),
        score,
      };
      return newItem;
    });

    const ordination = calculation.sort(({ score: a }, { score: b }) => b - a);
    return ordination;
  }

  /**
   * @description Calcula a quantidade de horas úteis, entre a data do Lead e a data presente
   *
   * @param {dateStart: Date}
   * @param {dateEnd: Date}
   * @returns {count: number}
   *
   * @author Thiago Castilho <tcastilho@outlook.com>
   */
  getBusinessHoursDiff(dateStart, dateEnd) {
    const start: Date = new Date(dateStart);
    const end: Date = new Date(dateEnd);
    let count = 0;

    for (
      let i = start.valueOf();
      i < end.valueOf();
      i = start.setMinutes(start.getMinutes() + 1).valueOf()
    ) {
      if (
        start.getDay() != 0 &&
        start.getDay() != 6 &&
        start.getHours() >= 9 &&
        start.getHours() < 18
      ) {
        count++;
      }
    }
    return count / 60;
  }
}

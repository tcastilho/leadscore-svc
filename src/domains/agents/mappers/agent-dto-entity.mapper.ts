import * as uuid from 'uuid';

import { AgentEntity } from 'src/entities/agent.entity';
import { AgentPostRequestDTO } from '../models/post/request.dto';

export const AgentMapperDTOToEntity = (
  agentDTO: AgentPostRequestDTO,
): AgentEntity => {
  return {
    id: uuid.v4(),
    dataInsercao: Date.now(),
    nome: agentDTO.nome,
    nivel: agentDTO.nivel,
    multiplicador: enumMultiplicador(agentDTO.nivel),
    ultimoLead: null,
  };
};

const enumMultiplicador = (nivel: string) => {
  let multi: number;
  switch (nivel) {
    case '1':
      multi = 1;
      break;
    case '2':
      multi = 1.5;
      break;
    default:
      multi = 2;
      break;
  }
  return multi;
};

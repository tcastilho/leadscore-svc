import * as uuid from 'uuid';

import { LeadEntity } from 'src/entities/lead.entity';
import { LeadPostRequestDTO } from '../models/post/request.dto';

export const LeadMapperDTOToEntity = (
  leadDTO: LeadPostRequestDTO,
): LeadEntity => {
  return {
    id: uuid.v4(),
    dataInsercao: Date.now(),
    nome: leadDTO.nome,
    telefone: leadDTO.telefone,
    agentId: null,
  };
};

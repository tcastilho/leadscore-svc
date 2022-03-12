import { AbstractValidator } from 'fluent-ts-validator';
import { ENivel } from 'src/shared/enums/nivel.enum';
import { isValueIncludedInEnum } from 'src/shared/helpers/validation/enum.validator';

import { AgentPostRequestDTO } from '../../models/post/request.dto';

export class AgentPostValidator extends AbstractValidator<AgentPostRequestDTO> {
  constructor() {
    super();

    this.validateIfAny((agent) => agent.nome)
      .isString()
      .isDefined()
      .hasLengthBetween(3, 40)
      .withFailureMessage('Nome do vendedor inválido.');

    this.validateIfAny((agent) => agent.nivel)
      .fulfills((nivel) => isValueIncludedInEnum(nivel, ENivel))
      .withFailureMessage('Nível do vendedor inválido.');
  }
}

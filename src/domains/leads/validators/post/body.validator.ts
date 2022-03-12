import { AbstractValidator } from 'fluent-ts-validator';

import { LeadPostRequestDTO } from '../../models/post/request.dto';

export class LeadPostValidator extends AbstractValidator<LeadPostRequestDTO> {
  constructor() {
    super();

    this.validateIfAny((agent) => agent.nome)
      .isString()
      .isDefined()
      .hasLengthBetween(3, 40)
      .withFailureMessage('Nome do lead inválido.');

    this.validateIfAny((agent) => agent.telefone)
      .isNumber()
      .isDefined()
      .withFailureMessage('Telefone do lead inválido.');
  }
}

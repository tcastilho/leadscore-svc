import { AbstractValidator } from 'fluent-ts-validator';
import { AgentGetRequestDTO } from '../../models/get/request.dto';

export class HeaderValidator extends AbstractValidator<AgentGetRequestDTO> {
  constructor() {
    super();

    this.validateIfNumber((headers: AgentGetRequestDTO) => headers.offset)
      .isDefined()
      .isNotEmpty()
      .isGreaterThanOrEqual(0)
      .withFailureMessage('Header offset inválido.');

    this.validateIfNumber((headers: AgentGetRequestDTO) => headers.limit)
      .isDefined()
      .isNotEmpty()
      .isGreaterThan(0)
      .isLessThan(50)
      .withFailureMessage('Header limit inválido.');
  }
}

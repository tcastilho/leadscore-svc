import { AbstractValidator } from 'fluent-ts-validator';

export class UUIDValidator extends AbstractValidator<string> {
  constructor(fieldName?: string) {
    super();

    const message = fieldName ? `${fieldName} inválido.` : 'Id inválido.';

    this.validateIfAny((id) => id)
      .isNotEmpty()
      .isString()
      .isUuid()
      .withFailureMessage(message);
  }
}

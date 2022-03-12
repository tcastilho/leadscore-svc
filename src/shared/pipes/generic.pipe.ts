import {
  ArgumentMetadata,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

export class GenericPipe<T> implements PipeTransform {
  constructor(private readonly validator: any) {}

  transform(data: T, metadata: ArgumentMetadata) {
    const validation = this.validator.validate(data);

    if (validation.isInvalid()) {
      throw new BadRequestException(validation.getFailureMessages());
    }

    return data as T;
  }
}

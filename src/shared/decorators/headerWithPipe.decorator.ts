import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const HeaderWithPipe = createParamDecorator(
  (data: any, req: ExecutionContext) => {
    const request = req.switchToHttp().getRequest<Request>();
    return request.headers;
  },
);

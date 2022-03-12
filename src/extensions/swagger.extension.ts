import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

import * as pkg from '../../package.json';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('LeadScore')
  .setDescription('Documentação das APIs do LeadScore')
  .setVersion(pkg.version)
  .setContact(
    pkg.contributors[0].name,
    pkg.contributors[0].url,
    pkg.contributors[0].email,
  )
  // .addTag('v1/users', 'Endpoints relacionados a Usuários')
  .build();

export const documento = (app: INestApplication): OpenAPIObject => {
  return SwaggerModule.createDocument(app, swaggerOptions, {
    include: [
      // UsersModule,
    ],
  });
};

export const setupSwaggerDocument = (documentName, app) => {
  SwaggerModule.setup(documentName, app, documento(app));
};

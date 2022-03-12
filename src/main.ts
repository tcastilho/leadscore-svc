if (process.env.NODE_ENV === 'dev') {
  require('/users/shared/leadscore-env/run.js');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

import * as express from 'express';

import { setupSwaggerDocument } from './extensions/swagger.extension';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwaggerDocument('api', app);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });

  app.use(
    express.json({
      type: ['application/json', 'text/plain'],
      limit: '50mb',
    }),
    express.urlencoded({ extended: true, limit: '50mb' }),
    helmet({
      permittedCrossDomainPolicies: {
        permittedPolicies: 'all',
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();

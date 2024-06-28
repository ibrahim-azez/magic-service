import { useContainer } from 'class-validator';
import { contentParser } from 'fastify-multer';
import qs from 'qs';

import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ClsMiddleware } from 'nestjs-cls';

import fastifyCookie from '@fastify/cookie';
import helmet from '@fastify/helmet';

import { setupSwagger } from './bootstrap/setups/setup-swagger';
import { API_DOCS_V1 } from './common/utils/constants';
import { envConfig } from './common/utils/env-config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: !envConfig.IS_PRODUCTION_ENV,
      ajv: {
        customOptions: {
          coerceTypes: 'array',
        },
      },
      querystringParser: (str) => qs.parse(str),
    }),
  );

  useContainer(app.select(AppModule), {
    fallback: true,
    fallbackOnErrors: true,
  });

  app.enableCors();

  await app.register(helmet, {
    strictTransportSecurity: { includeSubDomains: true, preload: true },
    noSniff: true,
    crossOriginOpenerPolicy: false,
    originAgentCluster: false,
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  });
  await app.register(fastifyCookie);

  await app.register(contentParser);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      stopAtFirstError: envConfig.IS_PRODUCTION_ENV,
      enableDebugMessages: !envConfig.IS_PRODUCTION_ENV,
    }),
  );

  if (envConfig.IS_PRODUCTION_ENV === false) {
    setupSwagger(app);
  }

  // create and mount the middleware manually here
  app.use(
    new ClsMiddleware({
      /* ...settings */
    }).use,
  );

  await app.listen(envConfig.PORT, '0.0.0.0');
  Logger.log(`Application is running on: ${envConfig.NODE_ENV}`);
  Logger.log(`Application is running on: ${envConfig.NODE_ENV}`);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
  Logger.log(
    `🚀 API documentation is running on: ${await app.getUrl()}/${API_DOCS_V1}`,
    'SWAGGER',
  );
}
void bootstrap();

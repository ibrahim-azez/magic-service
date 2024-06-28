import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces';

import { API_DOCS_V1 } from '../../common/utils/constants';
import { envConfig } from '../../common/utils/env-config';

export const setupSwagger = (app: NestExpressApplication) => {
  const document = createDocument(app);

  SwaggerModule.setup(API_DOCS_V1, app, document, {
    swaggerOptions: { persistAuthorization: true, docExpansion: 'none' },
  });
};

function createDocument(app: NestExpressApplication): OpenAPIObject {
  const documentBuilder = new DocumentBuilder()
    .setTitle(`Magic: ${envConfig.NODE_ENV} environment`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  return SwaggerModule.createDocument(app, documentBuilder, {});
}

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { setupSwagger } from './bootstrap/setups/setup-swagger';
import { envConfig } from './common/utils/env-config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  setupSwagger(app);
  await app.listen(envConfig.PORT);
}
void bootstrap();

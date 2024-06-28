import { NestFactory } from '@nestjs/core';

import { envConfig } from './common/utils/env-config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(envConfig.PORT);
}
void bootstrap();

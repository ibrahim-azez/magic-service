import { Module } from '@nestjs/common';

import { MagicOverController } from './controllers/magic-over.controller';
import { MagicOverRepository } from './controllers/magic-over.repository';
import { MagicOverService } from './controllers/magic-over.service';

@Module({
  imports: [],
  controllers: [MagicOverController],
  providers: [MagicOverService, MagicOverRepository],
})
export class MagicOverModule {}

import { Module } from '@nestjs/common';

import { MagicOverController } from './controllers/magic-over.controller';
import { MagicOverRepository } from './controllers/magic-over.repository';
import { MagicOverService } from './controllers/magic-over.service';
import { GetAllMagicOverQueryBuilderService } from './services/get-all-magic-over-query-builder.service';

@Module({
  imports: [],
  controllers: [MagicOverController],
  providers: [
    GetAllMagicOverQueryBuilderService,
    MagicOverService,
    MagicOverRepository,
  ],
})
export class MagicOverModule {}

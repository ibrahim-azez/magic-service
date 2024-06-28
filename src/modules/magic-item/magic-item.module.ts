import { Module } from '@nestjs/common';

import { MagicItemController } from './controllers/magic-item.controller';
import { MagicItemRepository } from './controllers/magic-item.repository';
import { MagicItemService } from './controllers/magic-item.service';

@Module({
  imports: [],
  controllers: [MagicItemController],
  providers: [MagicItemService, MagicItemRepository],
})
export class MagicItemModule {}

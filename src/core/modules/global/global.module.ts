import { Global, Module } from '@nestjs/common';

import { FilterService } from './services/filter.service';
import { GlobalFacade } from './services/global.facade';
import { PrismaService } from './services/prisma.service';

@Global()
@Module({
  providers: [GlobalFacade, FilterService, PrismaService],
  exports: [GlobalFacade, FilterService, PrismaService],
})
export class GlobalModule {}

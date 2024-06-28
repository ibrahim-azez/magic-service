import { Injectable } from '@nestjs/common';

import { GlobalFacade } from '../../../core/modules/global/services/global.facade';
import { CreateMagicItemDto } from '../dtos/create-magic-item.dto';

@Injectable()
export class MagicItemRepository {
  constructor(private readonly _globalFacade: GlobalFacade) {}
  async create({ name, magicOverId, weight }: CreateMagicItemDto) {
    return this._globalFacade.prismaService.magicItem.create({
      data: { magicOverId: magicOverId, name: name, weight: weight },
      select: null,
    });
  }
}

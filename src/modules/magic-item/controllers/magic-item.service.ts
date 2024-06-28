import { Injectable } from '@nestjs/common';

import { GlobalFacade } from '../../../core/modules/global/services/global.facade';
import { CreateMagicItemDto } from '../dtos/create-magic-item.dto';

import { MagicItemRepository } from './magic-item.repository';

@Injectable()
export class MagicItemService {
  constructor(
    private readonly _globalFacade: GlobalFacade,
    private readonly _magicItemRepository: MagicItemRepository,
  ) {}
  async create(createMagicItemDto: CreateMagicItemDto) {
    return this._magicItemRepository.create(createMagicItemDto);
  }
}

import { Injectable } from '@nestjs/common';

import { GlobalFacade } from '../../../core/modules/global/services/global.facade';
import { CreateMaginOverDto } from '../create-magic-over.dto';

import { MagicOverRepository } from './magic-over.repository';

@Injectable()
export class MagicOverService {
  constructor(
    private readonly _globalFacade: GlobalFacade,
    private readonly _magicOverRepository: MagicOverRepository,
  ) {}
  async create(createMaginOverDto: CreateMaginOverDto) {
    await this._magicOverRepository.create(createMaginOverDto);
  }
}

import { Injectable } from '@nestjs/common';

import { GlobalFacade } from '../../../core/modules/global/services/global.facade';
import { ChangeMagicOverStatusDto } from '../dtos/change-magic-over-status.dto';
import { CreateMagicOverDto } from '../dtos/create-magic-over.dto';

import { MagicOverRepository } from './magic-over.repository';

@Injectable()
export class MagicOverService {
  constructor(
    private readonly _globalFacade: GlobalFacade,
    private readonly _magicOverRepository: MagicOverRepository,
  ) {}
  async create(createMagicOverDto: CreateMagicOverDto) {
    return this._magicOverRepository.create(createMagicOverDto);
  }
  async changeStatus(changeMagicOverStatusDto: ChangeMagicOverStatusDto) {
    return this._magicOverRepository.changeStatus(changeMagicOverStatusDto);
  }
}

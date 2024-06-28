import { Injectable } from '@nestjs/common';

import { GlobalFacade } from '../../../core/modules/global/services/global.facade';
import { CreateMaginOverDto } from '../create-magic-over.dto';

@Injectable()
export class MagicOverRepository {
  constructor(private readonly _globalFacade: GlobalFacade) {}
  async create({ weightLimit, energy }: CreateMaginOverDto) {
    this._globalFacade.prismaService.magicOver.create({
      data: { weightLimit: weightLimit, energy: energy },
      select: null,
    });
  }
}
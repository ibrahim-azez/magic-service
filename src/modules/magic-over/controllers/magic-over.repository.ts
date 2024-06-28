import { Injectable } from '@nestjs/common';

import { GlobalFacade } from '../../../core/modules/global/services/global.facade';
import { ChangeMagicOverStatusDto } from '../dtos/change-magic-over-status.dto';
import { CreateMagicOverDto } from '../dtos/create-magic-over.dto';

@Injectable()
export class MagicOverRepository {
  constructor(private readonly _globalFacade: GlobalFacade) {}
  async create({ weightLimit, energy }: CreateMagicOverDto) {
    return this._globalFacade.prismaService.magicOver.create({
      data: { weightLimit: weightLimit, energy: energy },
    });
  }

  async changeStatus({ magicOverId, questState }: ChangeMagicOverStatusDto) {
    return this._globalFacade.prismaService.magicOver.update({
      data: { questState: questState },
      where: { id: magicOverId },
    });
  }
}

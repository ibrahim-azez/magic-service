import { Injectable } from '@nestjs/common';

import { Pagination } from '../../../common/utils/types';
import { GlobalFacade } from '../../../core/modules/global/services/global.facade';
import { ChangeMagicOverStatusDto } from '../dtos/change-magic-over-status.dto';
import { CreateMagicOverDto } from '../dtos/create-magic-over.dto';
import { GetAllMagicOverQueryBuilder } from '../services/get-all-magic-over-query-builder.service';

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

  async getAll(query: GetAllMagicOverQueryBuilder, pagination: Pagination) {
    const { limit, skip } = pagination;

    return this._globalFacade.prismaService['magicOver'].findMany({
      where: query,
      take: limit,
      skip: skip,
    });
  }
}

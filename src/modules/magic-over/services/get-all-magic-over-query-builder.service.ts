import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { AbstractQueryBuilder } from '../../../core/modules/global/utils/abstract-query-builder';
import { GetAllMagicOverDto } from '../dtos/get-all-magic-over.dto';

export type GetAllMagicOverQueryBuilder = {
  AND: Array<Prisma.MagicOverWhereInput>;
};
type TGetAllMagicOverQueryBuilderService = Omit<
  GetAllMagicOverDto,
  'pagination'
>;
@Injectable()
export class GetAllMagicOverQueryBuilderService extends AbstractQueryBuilder<
  'MagicOver',
  TGetAllMagicOverQueryBuilderService
> {
  constructor() {
    super({
      questState(value) {
        return { questState: value };
      },
    });
  }
}

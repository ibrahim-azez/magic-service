import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { makeSentenceReadyForSearch } from '../../../../common/utils/make-sentence-ready-for-search';
import { Models, WhereType } from '../@types';

@Injectable()
export class FilterService {
  filterByKeyword<T extends string | Models>(
    keyword: string,
    keys: (T extends Models ? keyof WhereType<T> : string)[],
  ) {
    const keywords = makeSentenceReadyForSearch(keyword);
    return Prisma.validator()({
      OR: keys
        .map((key) => {
          return [
            ...keywords.map((keyword) => {
              return {
                [key]: {
                  contains: keyword,
                  mode: 'insensitive' as const,
                },
              };
            }),
          ];
        })
        .flat(),
    });
  }
}

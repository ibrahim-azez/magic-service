import { excludeUndefinedValue } from '../../../../common/utils/exclude-undefined-value';
import type { Models, WhereType } from '../@types';

type QueryMapType<V extends Models, REQUIRED_DTO, DTO> = Required<{
  [P in keyof REQUIRED_DTO]: (
    value: REQUIRED_DTO[P],
    dto: OmitPagination<DTO>,
  ) => WhereType<V> | null;
}>;

type OmitPagination<T> = Omit<T, 'pagination'>;

export abstract class AbstractQueryBuilder<V extends Models, DTO> {
  protected constructor(
    protected readonly queryMap: QueryMapType<
      V,
      Required<OmitPagination<DTO>>,
      DTO
    >,
    protected readonly defaultQuery?: (
      dto: OmitPagination<DTO>,
    ) => WhereType<V>,
  ) {}

  build(dto: OmitPagination<DTO>) {
    let query: WhereType<V>[];

    const keys = Object.keys(this.queryMap) as (keyof typeof this.queryMap)[];

    // eslint-disable-next-line prefer-const
    query = keys
      .map((key) => {
        if (dto[key] === undefined) {
          return undefined;
        }
        const query = this.queryMap[key](dto[key], dto);
        if (query === null) {
          return undefined;
        }
        return query;
      })
      .filter(excludeUndefinedValue);

    if (this.defaultQuery !== undefined) {
      query.push(this.defaultQuery(dto));
    }

    return { AND: query };
  }
}

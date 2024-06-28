import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

import { MyIsOptional } from '../decorators/my-is-optional.decorator';

export type PaginationDtoMixinOptions = {
  limit: { default?: number; max: number };
  skip?: { default?: number };
};
export function paginationDtoMixin(options: PaginationDtoMixinOptions) {
  class PaginationDto {
    @MyIsOptional()
    @IsInt()
    @Min(0)
    @Max(options.limit.max)
    @Type(() => Number)
    limit: number = options.limit.default ?? 10;

    @MyIsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    skip: number = options.skip?.default ?? 0;
  }

  return { PaginationDto, instance: new PaginationDto() };
}

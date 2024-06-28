import { MyIsObject } from '../../core/decorators/my-is-object.decorator';
import { ApiPagination } from '../../core/decorators/swagger/api-pagination.decorator';
import {
  paginationDtoMixin,
  PaginationDtoMixinOptions,
} from '../../core/mixins/pagination-dto.mixin';

export function paginationDto(options: PaginationDtoMixinOptions) {
  const { PaginationDto, instance } = paginationDtoMixin(options);

  class PaginationBaseDto {
    @ApiPagination()
    @MyIsObject({
      classConstructor: PaginationDto,
      options: { canBeOptional: true },
    })
    pagination = instance;
  }

  return PaginationBaseDto;
}

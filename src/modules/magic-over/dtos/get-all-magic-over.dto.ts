import { IsEnum } from 'class-validator';

import { ApiProperty, IntersectionType } from '@nestjs/swagger';

import { QuestState } from '@prisma/client';

import { paginationDto } from '../../../common/dtos/pagination.dto';
import { MyIsOptional } from '../../../core/decorators/my-is-optional.decorator';
import { MAGIC_OVER_MAX_LIMIT } from '../utils/constants';

export class GetAllMagicOverDto extends IntersectionType(
  paginationDto({
    limit: { max: MAGIC_OVER_MAX_LIMIT },
  }),
) {
  @ApiProperty({ type: String, enum: QuestState })
  @MyIsOptional()
  @IsEnum(QuestState)
  questState?: QuestState;
}

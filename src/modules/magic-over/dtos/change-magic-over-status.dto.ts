import { IsEnum, IsMongoId } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { QuestState } from '@prisma/client';

export class ChangeMagicOverStatusDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  magicOverId!: string;

  @ApiProperty({ type: String, enum: QuestState })
  @IsEnum(QuestState)
  questState!: QuestState;
}

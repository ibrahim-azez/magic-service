import { IsMongoId, IsNumber, IsString, Min, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateMagicItemDto {
  @ApiProperty({ type: String })
  @IsString()
  @MinLength(2)
  name!: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(0)
  weight!: number;

  @ApiProperty({ type: String })
  @IsMongoId()
  magicOverId!: string;
}

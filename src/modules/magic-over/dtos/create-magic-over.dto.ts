import { IsNumber, Max, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateMagicOverDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  @Max(999999)
  @Min(0)
  weightLimit!: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(0)
  energy!: number;
}

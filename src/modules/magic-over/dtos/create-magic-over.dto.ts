import { IsNumber, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateMaginOverDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(0)
  weightLimit!: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(0)
  energy!: number;
}

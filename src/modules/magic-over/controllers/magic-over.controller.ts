import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';

import { MAGICS_OVER_API_PATH } from '../../../common/utils/constants';
import { CreateMaginOverDto } from '../dtos/create-magic-over.dto';

import { MagicOverService } from './magic-over.service';

@Controller(MAGICS_OVER_API_PATH)
export class MagicOverController {
  constructor(private readonly _magicOverService: MagicOverService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async create(@Body() createMagicOverDto: CreateMaginOverDto) {
    return this._magicOverService.create(createMagicOverDto);
  }
}

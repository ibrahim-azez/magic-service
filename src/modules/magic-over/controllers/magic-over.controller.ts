import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';

import { MAGIC_OVER_API_PATH } from '../../../common/utils/constants';
import { CreateMaginOverDto } from '../create-magic-over.dto';

import { MagicOverService } from './magic-over.service';

@Controller(MAGIC_OVER_API_PATH)
export class MagicOverController {
  constructor(private readonly _magicOverService: MagicOverService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async create(@Body() createMagicOverDto: CreateMaginOverDto) {
    await this._magicOverService.create(createMagicOverDto);

    return;
  }
}

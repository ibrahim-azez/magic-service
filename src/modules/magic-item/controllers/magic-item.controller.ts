import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';

import { MAGICS_API_PATH } from '../../../common/utils/constants';
import { CreateMagicItemDto } from '../dtos/create-magic-item.dto';

import { MagicItemService } from './magic-item.service';

@Controller(MAGICS_API_PATH)
export class MagicItemController {
  constructor(private readonly _magicOverService: MagicItemService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async create(@Body() _magicItemRepository: CreateMagicItemDto) {
    return this._magicOverService.create(_magicItemRepository);
  }
}

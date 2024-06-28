import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { MAGICS_API_PATH } from '../../../common/utils/constants';
import { CreateMagicItemDto } from '../dtos/create-magic-item.dto';
import { CreateMagicItemPipe } from '../pipes/create-magic-item.pipe';

import { MagicItemService } from './magic-item.service';

@Controller(MAGICS_API_PATH)
@ApiTags('Magic Item')
export class MagicItemController {
  constructor(private readonly _magicOverService: MagicItemService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async create(
    @Body(CreateMagicItemPipe) magicItemRepository: CreateMagicItemDto,
  ) {
    return this._magicOverService.create(magicItemRepository);
  }
}

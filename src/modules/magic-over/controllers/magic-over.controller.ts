import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { MAGICS_OVER_API_PATH } from '../../../common/utils/constants';
import { ChangeMagicOverStatusDto } from '../dtos/change-magic-over-status.dto';
import { CreateMagicOverDto } from '../dtos/create-magic-over.dto';

import { MagicOverService } from './magic-over.service';

@Controller(MAGICS_OVER_API_PATH)
export class MagicOverController {
  constructor(private readonly _magicOverService: MagicOverService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async create(@Body() createMagicOverDto: CreateMagicOverDto) {
    return this._magicOverService.create(createMagicOverDto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async changeStatus(
    @Body() changeMagicOverStatusDto: ChangeMagicOverStatusDto,
  ) {
    return this._magicOverService.changeStatus(changeMagicOverStatusDto);
  }
}

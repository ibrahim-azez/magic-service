import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { MAGICS_OVER_API_PATH } from '../../../common/utils/constants';
import { ChangeMagicOverStatusDto } from '../dtos/change-magic-over-status.dto';
import { CreateMagicOverDto } from '../dtos/create-magic-over.dto';
import { GetAllMagicOverDto } from '../dtos/get-all-magic-over.dto';
import { GetAllMagicOverQueryBuilderService } from '../services/get-all-magic-over-query-builder.service';

import { MagicOverService } from './magic-over.service';

@Controller(MAGICS_OVER_API_PATH)
@ApiTags('Magic Over')
export class MagicOverController {
  constructor(
    private readonly _magicOverService: MagicOverService,
    private readonly _getAllMagicOverQueryBuilderService: GetAllMagicOverQueryBuilderService,
  ) {}

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

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async getAll(@Query() getAllMagicOverDto: GetAllMagicOverDto) {
    const { pagination, ...dto } = getAllMagicOverDto;
    const queryBuilder = this._getAllMagicOverQueryBuilderService.build({
      ...dto,
    });

    return this._magicOverService.getAll(queryBuilder, pagination);
  }
}

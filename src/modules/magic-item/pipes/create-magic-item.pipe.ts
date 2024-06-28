import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';

import { GlobalFacade } from '../../../core/modules/global/services/global.facade';
import { CreateMagicItemDto } from '../dtos/create-magic-item.dto';

@Injectable()
export class CreateMagicItemPipe implements PipeTransform<CreateMagicItemDto> {
  constructor(private readonly _globalFacade: GlobalFacade) {}

  async transform(
    value: CreateMagicItemDto,
    _metadata: ArgumentMetadata,
  ): Promise<CreateMagicItemDto> {
    const magicOver =
      await this._globalFacade.prismaService.magicOver.findUnique({
        where: { id: value.magicOverId },
      });

    if (!magicOver) {
      throw new NotFoundException('Magic over does not exist');
    }

    if (magicOver.questState !== 'LOADING') {
      throw new UnprocessableEntityException(
        'Magic over status is not loading',
      );
    }
    return value;
  }
}

import { ClassConstructor, Type } from 'class-transformer';
import { IsObject, ValidateNested, ValidationOptions } from 'class-validator';

import { applyDecorators } from '@nestjs/common';

import { MyIsOptional } from './my-is-optional.decorator';

type ValidateObjectOptions = { canBeOptional: boolean };

export function MyIsObject(obj: {
  classConstructor: ClassConstructor<unknown>;
  options?: ValidateObjectOptions;
  validationOptions?: ValidationOptions;
}) {
  const { validationOptions, options, classConstructor } = obj;
  let defaultOptions: ValidateObjectOptions = { canBeOptional: false };

  if (options) {
    const { canBeOptional } = options;
    defaultOptions = {
      canBeOptional: canBeOptional
        ? canBeOptional
        : defaultOptions.canBeOptional,
    };
  }

  const decorators: Array<PropertyDecorator> = [
    IsObject(validationOptions),
    ValidateNested(validationOptions),
    Type(() => classConstructor),
  ];

  if (defaultOptions.canBeOptional) {
    decorators.push(MyIsOptional(false, validationOptions));
  }

  return applyDecorators(...decorators);
}

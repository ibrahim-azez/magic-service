import { IsOptional, ValidateIf, ValidationOptions } from 'class-validator';

/**
 * Checks if value is missing and if so, ignores all validators.
 *
 * @param nullable If `true`, all other validators will be skipped even when the value is `null`. `false` by default.
 * @param validationOptions {@link ValidationOptions}
 *
 * @see MyIsOptional exported from `class-validator.
 */
export function MyIsOptional(
  nullable = false,
  validationOptions?: ValidationOptions,
) {
  if (nullable === false)
    return ValidateIf((_object: unknown, value: unknown) => {
      return value !== undefined;
    }, validationOptions);

  return IsOptional(validationOptions);
}

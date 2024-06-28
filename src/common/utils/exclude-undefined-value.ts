export function excludeUndefinedValue<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value !== undefined;
}

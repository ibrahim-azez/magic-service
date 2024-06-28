import { ApiPropertyOptional } from '@nestjs/swagger';

export const ApiPagination = (pagination?: { skip: number; limit: number }) => {
  return ApiPropertyOptional({
    type: 'object',
    properties: { skip: { type: 'number' }, limit: { type: 'number' } },
    default: {
      pagination: {
        skip: pagination?.skip ?? 0,
        limit: pagination?.limit ?? 1,
      },
    },
  });
};

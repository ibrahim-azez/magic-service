import type { Prisma } from '@prisma/client';

type Models = keyof typeof Prisma.ModelName;

type ArgsType<T extends Models> =
  Prisma.TypeMap['model'][T]['operations']['findMany']['args'];

type WhereType<T extends Models> = NonNullable<ArgsType<T>['where']>;

type FindUniqueType<T extends Models> =
  Prisma.TypeMap['model'][T]['operations']['findUnique'];

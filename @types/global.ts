/* eslint-disable @typescript-eslint/no-namespace */
export {};
declare global {
  type ArrayElement<T> = T extends (infer U)[] ? U : never;

  type Prettify<T> = {
    [K in keyof T]: T[K];
    // eslint-disable-next-line @typescript-eslint/ban-types
  } & {};

  interface String {
    toUpperCase<T extends string>(this: T): Uppercase<T>;
    toLowerCase<T extends string>(this: T): Lowercase<T>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type ArrayOfEntities = Array<Record<string, any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type EntityRecord = Record<string, any>;

  type DateOrString = Date | string;
  type Nullable<T> = T | null;
  type MaybeArray<T> = T | Array<T>;

  type Combine<T1, T2> = Prettify<
    {
      [K in keyof (T1 | T2)]: T1[K] | T2[K];
    } & Partial<Omit<T1, keyof (T1 | T2)> & Omit<T2, keyof (T1 | T2)>>
  >;

  type Numberish = number | `${number}`;
  type Booleanish = boolean | `${boolean}`;
  type Stringish = string | `${boolean}` | `${number}`;

  type GlobalEntityOptions = {
    language: string;
  };

  type ListModel<T> = {
    data: T[];
    totalCount: number;
  };

  type PromisedListModel<T> = Promise<ListModel<T>>;
}

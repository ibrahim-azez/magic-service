import { config } from 'dotenv';

import { Logger } from '@nestjs/common';

config();

function getEnvVariable<U extends Stringish>(key: string, defaultValue?: U): U {
  const envKey = process.env[key];

  if (envKey !== undefined) {
    return String(envKey) as U;
  }

  if (defaultValue !== undefined) {
    Logger.warn(
      `can't find environment variable ${key}, will fallback on default value ${defaultValue}`,
    );
    return String(defaultValue) as U;
  }

  throw new Error(`can't find environment variable ${key}, and it is required`);
}

export const NodeEnv = {
  development: 'development',
  production: 'production',
  staging: 'staging',
  test: 'test',
} as const;

export type NodeEnv = (typeof NodeEnv)[keyof typeof NodeEnv];

export const envConfig: EnvConfig = {
  DATABASE_URL: getEnvVariable(
    'DATABASE_URL',
    'postgresql://postgres:password@127.0.0.1:5432/postgres',
  ),
  PORT: parseInt(getEnvVariable<`${number}`>('PORT', '3000')),
  MODE: getEnvVariable('MODE', 'OTHER'),
  NODE_ENV: getEnvVariable<NodeEnv>('NODE_ENV', 'development'),
  IS_PRODUCTION_ENV: getEnvVariable<NodeEnv>('NODE_ENV') === 'production',
  IS_STAGE_ENV: getEnvVariable<NodeEnv>('NODE_ENV') === 'staging',
  IS_DEVELOPMENT_ENV: getEnvVariable<NodeEnv>('NODE_ENV') === 'development',
  IS_SERVER_RUNNING_LOCAL:
    getEnvVariable<`${boolean}`>('LOCAL', 'true') === 'true',
};

export class EnvConfig {
  DATABASE_URL!: string;
  PORT!: number;
  MODE!: 'DEBUGGING' | 'OTHER';
  NODE_ENV!: NodeEnv;
  IS_PRODUCTION_ENV!: boolean;
  IS_STAGE_ENV!: boolean;
  IS_DEVELOPMENT_ENV!: boolean;
  IS_SERVER_RUNNING_LOCAL!: boolean;
}

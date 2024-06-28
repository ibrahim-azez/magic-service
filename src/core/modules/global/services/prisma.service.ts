import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { isObject } from '@nestjs/common/utils/shared.utils';

import { PrismaClient } from '@prisma/client';

import { envConfig } from '../../../../common/utils/env-config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  readonly logger = new Logger(PrismaService.name);
  constructor() {
    super(
      envConfig.MODE === 'DEBUGGING'
        ? {
            log: [
              { emit: 'event', level: 'query' },
              { emit: 'event', level: 'info' },
              { emit: 'event', level: 'error' },
              { emit: 'event', level: 'warn' },
            ],
          }
        : undefined,
    );
  }
  async onModuleInit() {
    try {
      await this['$connect']();
      // const data = await prisma.$queryRaw`SELECT 1`;
    } catch (error: unknown) {
      // log error
      this.logger.error(error);
      if (isObject(error)) {
        this.logger.error('keys: ', Object.keys(error));
        this.logger.error(
          'error.errorCode: ',
          (error as Record<string, unknown>)['errorCode'],
        );
        this.logger.error(
          'error.code: ',
          (error as Record<string, unknown>)['code'],
        );
      }
      this.logger.error(JSON.stringify(error, null, 2));
    }

    if (envConfig.MODE === 'DEBUGGING') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.$on('query', async (e) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-console
        console.log(`${e.query} ${e.params}`);
      });
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await Promise.all([this['$disconnect'](), app.close()]);
    });
  }
}

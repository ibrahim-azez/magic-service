import { Module } from '@nestjs/common';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { ClsModule } from 'nestjs-cls';

import { GlobalModule } from './core/modules/global/global.module';
import { PrismaService } from './core/modules/global/services/prisma.service';
import { MagicOverModule } from './modules/magic-over/magic-over.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: false },
      guard: { mount: true },
      plugins: [
        new ClsPluginTransactional({
          imports: [
            // module in which the PrismaClient is provided
            GlobalModule,
          ],
          adapter: new TransactionalAdapterPrisma({
            // the injection token of the PrismaClient
            prismaInjectionToken: PrismaService,
          }),
        }),
      ],
    }),
    GlobalModule,
    MagicOverModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';

@Injectable()
export class GlobalFacade {
  constructor(
    public readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  get prismaService() {
    return this.txHost.tx;
  }
}

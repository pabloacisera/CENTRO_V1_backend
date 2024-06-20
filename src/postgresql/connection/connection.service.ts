/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ConnectionService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    throw new Error('Method not implemented.');
  }
  async OnModuleInit() {
    await this.$connect();
  }
}

import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';

@Module({
  providers: [ConnectionService],
  exports: [ConnectionService],
})
// eslint-disable-next-line prettier/prettier
export class connModule {}                                
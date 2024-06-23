import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ConnectionService } from 'src/postgresql/connection/connection.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, ConnectionService],
})
export class ClientModule {}

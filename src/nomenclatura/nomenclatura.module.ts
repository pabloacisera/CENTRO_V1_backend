import { Module } from '@nestjs/common';
import { NomenclaturaService } from './nomenclatura.service';
import { NomenclaturaController } from './nomenclatura.controller';
import { ConnectionService } from 'src/postgresql/connection/connection.service';

@Module({
  controllers: [NomenclaturaController],
  providers: [NomenclaturaService, ConnectionService],
})
export class NomenclaturaModule {}

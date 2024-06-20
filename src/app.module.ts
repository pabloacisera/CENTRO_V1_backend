import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionService } from './postgresql/connection/connection.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ConnectionService],
})
export class AppModule {}

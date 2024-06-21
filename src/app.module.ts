import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionService } from './postgresql/connection/connection.service';
import * as cookieParser from 'cookie-parser';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ConnectionService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser());
  }
}

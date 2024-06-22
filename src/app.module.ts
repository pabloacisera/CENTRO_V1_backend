import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionService } from './postgresql/connection/connection.service';
import { UsersModule } from './users/users.module';
import * as cookieParser from 'cookie-parser';
import { ClassTransformer } from 'class-transformer';



@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, ConnectionService, ClassTransformer],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser());
  }
}

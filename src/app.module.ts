import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionService } from './postgresql/connection/connection.service';
import { UsersModule } from './users/users.module';
import * as cookieParser from 'cookie-parser';
import { AuthModule } from './auth/auth/auth.module';
import { ClientModule } from './client/client.module';
import helmet from 'helmet';
import { LoggerMiddleware } from './config/logger.middleware';
import { NomenclaturaModule } from './nomenclatura/nomenclatura.module';

@Module({
  imports: [UsersModule, AuthModule, ClientModule, NomenclaturaModule],
  controllers: [AppController],
  providers: [AppService, ConnectionService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser(), helmet(), LoggerMiddleware).forRoutes('*');
  }
}

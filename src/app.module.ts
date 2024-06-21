import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionService } from './postgresql/connection/connection.service';
import { UserModule } from './user/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, ConnectionService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConnectionService } from 'src/postgresql/connection/connection.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ConnectionService],
})
export class AuthModule {}

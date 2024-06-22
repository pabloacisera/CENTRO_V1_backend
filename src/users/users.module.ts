import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConnectionService } from 'src/postgresql/connection/connection.service';

@Module({
  imports:[],
  controllers: [UsersController],
  providers: [UsersService, ConnectionService],
  exports:[]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { connModule } from 'src/postgresql/connection/connection.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [connModule],
  exports: [],
})
export class UserModule {}

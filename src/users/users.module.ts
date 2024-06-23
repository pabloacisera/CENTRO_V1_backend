import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConnectionService } from 'src/postgresql/connection/connection.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from 'src/config/jwtConstant';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, ConnectionService],
  exports: [],
})
export class UsersModule {}

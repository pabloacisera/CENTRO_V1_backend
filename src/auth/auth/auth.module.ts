import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
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
  controllers: [AuthController],
  providers: [AuthService, ConnectionService],
})
export class AuthModule {}

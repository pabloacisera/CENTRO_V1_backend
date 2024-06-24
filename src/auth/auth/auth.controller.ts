import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthDto, @Res() res: Response) {
    try {
      const response = await this.authService.login(body);

      res.cookie('authToken', response.token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });

      return res.status(HttpStatus.OK).json({
        message: 'Login successful',
        email: response.email,
        name: response.name,
      });
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: error.message });
    }
  }
}

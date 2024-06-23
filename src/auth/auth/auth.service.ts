import { BadRequestException, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/postgresql/connection/connection.service';
import { AuthDto } from '../dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: ConnectionService,
    private readonly jwtService: JwtService,
  ) {}
  async login(authDto: AuthDto) {
    const { email, password } = authDto;

    try {
      const userFind = await this.prisma.user.findFirst({
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (!userFind) {
        throw new BadRequestException('El email no existe en base de datos');
      }

      const isPasswordValid = await bcrypt.compare(password, userFind.password);

      if (!isPasswordValid) {
        throw new BadRequestException('No se puede autenticar usuario');
      }

      const payload = { email: userFind.email };
      const token = await this.jwtService.signAsync(payload);

      return {
        token,
        email,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

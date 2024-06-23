import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { ConnectionService } from 'src/postgresql/connection/connection.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: ConnectionService,
    private readonly jwtService: JwtService,
  ) {}

  private saltRounds = 10;

  async create(userDto: CreateUserDto) {
    const { area, name, email, password } = userDto;

    try {
      const userFind = await this.prisma.user.findFirst({
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (userFind) {
        throw new BadRequestException('El email ya existe en base de datos');
      }

      const passHash = await bcrypt.hash(password, this.saltRounds);

      const user = await this.prisma.user.create({
        data: {
          area: area,
          name: name,
          email: email,
          password: passHash,
        },
      });

      const payload = { email: user.email };
      const token = await this.jwtService.signAsync(payload);

      return {
        token,
        area,
        email,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findAll() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.user.delete({ where: { id } });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

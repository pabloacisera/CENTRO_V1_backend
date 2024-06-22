import { Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { ConnectionService } from 'src/postgresql/connection/connection.service';

@Injectable()
export class UsersService {

  constructor(
    private readonly prisma: ConnectionService,
  ) {}

  private saltRounds = 10;

  async create(userDto: CreateUserDto) {
    const { area, name, email, password } = userDto;

    try {
      // Verificar si el usuario ya existe en la base de datos
      const userFind = await this.prisma.user.findFirst({
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (userFind) {
        throw new Error('El email ya existe en base de datos');
      }

      // Hashear la contraseña antes de guardarla en la base de datos
      const passHash = await bcrypt.hash(password, 10); // Cambia 10 por this.saltRounds si es necesario

      // Crear un nuevo usuario en la base de datos utilizando Prisma
      const user = await this.prisma.user.create({
        data: {
          area: area,
          name: name,
          email: email,
          password: passHash,
        },
      });

      // Devolver los datos del usuario recién creado
      return user;
    } catch (error) {
      // Capturar y relanzar el error para que el controlador pueda manejarlo
      throw new Error(error.message);
    }
  }
  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({ where: { id } });
    return user;
  }
}
  
  
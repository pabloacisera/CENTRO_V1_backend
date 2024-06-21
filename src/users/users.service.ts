import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcryptjs';
import { ConnectionService } from 'src/postgresql/connection/connection.service';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: ConnectionService) {}


  async create(userDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        area: userDto.area,
        name: userDto.name,
        email: userDto.email,
        password: userDto.password,
      },
    });
    return user;
    
  }

  async findAll() {
    const users = await this.prisma.user.findMany()
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique( {where: {id}})
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update( {where: {id}, data: updateUserDto})
    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({where: {id}})
    return user;
  }
}

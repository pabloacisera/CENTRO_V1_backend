import { Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/postgresql/connection/connection.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: ConnectionService) {}

  async getAllUsers(): Promise<User[]> {
    const allUsers = await this.prisma.user.findMany();
    console.log(allUsers);
    return allUsers;
  }

  async getOneUser(id: number): Promise<User> {
    const oneUser = await this.prisma.user.findUnique({ where: { id } });
    console.log(oneUser);
    return oneUser;
  }

  async createUser(data: User): Promise<User> {
    const newUser = await this.prisma.user.create({ data });
    console.log(newUser);
    return newUser;
  }

  async updateUser(id: number, data: User): Promise<User> {
    const updateData = await this.prisma.user.update({ where: { id }, data });
    console.log(updateData);
    return updateData;
  }

  async deleteUser(id: number): Promise<User> {
    const deleteData = await this.prisma.user.delete({ where: { id } });
    return deleteData;
  }
}

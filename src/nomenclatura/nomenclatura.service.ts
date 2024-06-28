import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConnectionService } from 'src/postgresql/connection/connection.service';

@Injectable()
export class NomenclaturaService {
  constructor(private readonly prisma: ConnectionService) {}

  findAll() {
    try {
      const response = this.prisma.nomenclatura.findMany();
      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener la nomenclatura',
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} nomenclatura`;
  }
}

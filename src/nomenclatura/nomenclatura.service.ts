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

  async buscarPorCodigo(codigo: number) {
    try {
      const response = await this.prisma.nomenclatura.findFirst({
        where: {
          codigo,
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al obtener codigo');
    }
  }

  async buscarPorDeterminacion(determinacion: string) {
    try {
      const response = await this.prisma.nomenclatura.findMany({
        where: {
          determinacion: {
            contains: determinacion.toUpperCase(), // Convert to uppercase for case-insensitive search
          },
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al obtener determinacion');
    }
  }
}

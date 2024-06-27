import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ConnectionService } from 'src/postgresql/connection/connection.service';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: ConnectionService) {}
  async create(clientDto: CreateClientDto) {
    if (
      !clientDto.name ||
      !clientDto.socialsecuritynumber ||
      !clientDto.email
    ) {
      throw new BadRequestException('Invalid Request Data');
    }
    try {
      const newClient = await this.prisma.client.create({
        data: {
          name: clientDto.name,
          surname: clientDto.surname,
          socialsecuritynumber: clientDto.socialsecuritynumber,
          dateofbirth: clientDto.toDateOfbirth().toISOString(),
          age: clientDto.age,
          address: clientDto.address,
          location: clientDto.location,
          phone: clientDto.phone,
          email: clientDto.email,
          healthinsurance: clientDto.healthinsurance,
          observation: clientDto.observation,
          turno: clientDto.turno,
        },
      });
      return newClient;
    } catch (error) {
      throw new HttpException('Error al crear cliente', 500);
    }
  }

  async findAll() {
    try {
      const response = await this.prisma.client.findMany();
      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener la lista de clientes',
      );
    }
  }

  async findOne(id: number) {
    try {
      const response = await this.prisma.client.findUnique({ where: { id } });
      if (!response) {
        throw new NotFoundException(`Cliente ${id} no encontrado`);
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener cliente');
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      const response = await this.prisma.client.update({
        where: { id },
        data: {
          ...updateClientDto,
          dateofbirth: new Date(updateClientDto.dateofbirth), // Asegúrate de convertir la fecha si es necesario
        },
      });
      return response;
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      throw new InternalServerErrorException('Error al actualizar el cliente');
    }
  }

  async remove(id: number) {
    try {
      const response = await this.prisma.client.delete({
        where: { id },
      });
      return response;
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar cliete');
    }
  }
}

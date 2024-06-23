import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ConnectionService } from 'src/postgresql/connection/connection.service';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: ConnectionService) {}
  async create(clientDto: CreateClientDto) {
    const newClient = await this.prisma.client.create({
      data: {
        name: clientDto.name,
        surname: clientDto.surname,
        socialsecuritynumber: clientDto.socialSecurityNumber,
        dateofbirth: clientDto.toDateOfbirth().toISOString(),
        age: clientDto.age,
        address: clientDto.address,
        location: clientDto.location,
        phone: clientDto.phone,
        email: clientDto.email,
        healthinsurance: clientDto.healthInsurance,
        observation: clientDto.observation,
        turno: clientDto.turno,
      },
    });
    return newClient;
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    console.log(updateClientDto);
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ProtectedRouteGuard } from 'src/protected-route/protected-route.guard';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @UseGuards(ProtectedRouteGuard)
  create(@Body() createClientDto: CreateClientDto) {
    try {
      return this.clientService.create(createClientDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get()
  @UseGuards(ProtectedRouteGuard)
  findAll() {
    try {
      return this.clientService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @UseGuards(ProtectedRouteGuard)
  findOne(@Param('id') id: string) {
    try {
      return this.clientService.findOne(+id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(error.messge, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Patch(':id')
  @UseGuards(ProtectedRouteGuard)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    try {
      return this.clientService.update(+id, updateClientDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @UseGuards(ProtectedRouteGuard)
  remove(@Param('id') id: string) {
    try {
      return this.clientService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

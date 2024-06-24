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
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProtectedRouteGuard } from 'src/protected-route/protected-route.guard';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const { token, area, email } =
        await this.usersService.create(createUserDto);
      console.log('Token generado:', token); // Verifica que el token se genere correctamente
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });
      return res.status(HttpStatus.CREATED).json({ area, email });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get()
  async findAll() {
    try {
      const user = await this.usersService.findAll();
      return user;
    } catch (error) {
      throw new HttpException(error.messge, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @UseGuards(ProtectedRouteGuard)
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(+id);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Patch(':id')
  @UseGuards(ProtectedRouteGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(+id, updateUserDto);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @UseGuards(ProtectedRouteGuard)
  async remove(@Param('id') id: string) {
    try {
      const user = await this.usersService.remove(+id);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

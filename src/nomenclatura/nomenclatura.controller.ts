import { Controller, Get, Param } from '@nestjs/common';
import { NomenclaturaService } from './nomenclatura.service';

@Controller('nom')
export class NomenclaturaController {
  constructor(private readonly nomenclaturaService: NomenclaturaService) {}

  @Get()
  findAll() {
    return this.nomenclaturaService.findAll();
  }

  @Get(':codigo')
  async buscarPorCodigo(@Param('codigo') codigo: number) {
    return this.nomenclaturaService.buscarPorCodigo(codigo);
  }

  @Get('/text/:determinacion')
  async buscarPorDeterminacion(@Param('determinacion') determinacion: string) {
    return this.nomenclaturaService.buscarPorDeterminacion(determinacion);
  }
}

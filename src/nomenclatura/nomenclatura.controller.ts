import { Controller, Get, Param } from '@nestjs/common';
import { NomenclaturaService } from './nomenclatura.service';

@Controller('nom')
export class NomenclaturaController {
  constructor(private readonly nomenclaturaService: NomenclaturaService) {}

  @Get()
  findAll() {
    return this.nomenclaturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomenclaturaService.findOne(+id);
  }
}

import { PartialType } from '@nestjs/swagger';
import { CreateNomenclaturaDto } from './create-nomenclatura.dto';

export class UpdateNomenclaturaDto extends PartialType(CreateNomenclaturaDto) {}

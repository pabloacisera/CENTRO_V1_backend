import { IsEmail, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  socialSecurityNumber: string;

  @IsString()
  dateOfbirth: string;

  toDateOfbirth(): Date {
    return new Date(this.dateOfbirth);
  }

  @IsString()
  age: string;

  @IsString()
  address: string;

  @IsString()
  location: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  healthInsurance: string;

  @IsString()
  observation: string;

  @IsString()
  turno: string;
}

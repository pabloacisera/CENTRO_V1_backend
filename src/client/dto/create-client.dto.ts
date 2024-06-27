import { IsEmail, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  socialsecuritynumber: string;

  @IsString()
  dateofbirth: string;

  toDateOfbirth(): Date {
    return new Date(this.dateofbirth);
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
  healthinsurance: string;

  @IsString()
  observation: string;

  @IsString()
  turno: string;
}

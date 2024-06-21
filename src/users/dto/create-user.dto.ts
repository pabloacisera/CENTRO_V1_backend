import { Exclude } from "class-transformer";
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  area: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}

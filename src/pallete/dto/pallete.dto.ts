import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePalleteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  colors: string;
}

export class UpdatePalleteDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  colors: string;
}

import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  icon: string;

  @IsOptional()
  @IsNumber()
  displayOrder: number;
}

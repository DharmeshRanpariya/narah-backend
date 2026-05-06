import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';

export class CreateGalleryItemDto {
  @IsEnum(['photo', 'reel'])
  type: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsNumber()
  displayOrder: number;
}

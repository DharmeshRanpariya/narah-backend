import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateHeroSlideDto {
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  eyebrow: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subtitle: string;

  @IsOptional()
  @IsString()
  ctaText: string;

  @IsOptional()
  @IsString()
  ctaLink: string;

  @IsOptional()
  @IsNumber()
  displayOrder: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

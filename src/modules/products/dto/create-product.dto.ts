import { IsString, IsNumber, IsOptional, IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsMongoId()
  categoryId: Types.ObjectId;

  @IsOptional()
  @IsString()
  sku: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  shortDescription: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  salePrice: number;

  @IsNumber()
  stockQuantity: number;

  @IsOptional()
  @IsNumber()
  lowStockThreshold: number;

  @IsOptional()
  @IsString()
  material: string;

  @IsOptional()
  @IsString()
  weight: string;

  @IsOptional()
  @IsString()
  dimensions: string;

  @IsOptional()
  @IsString()
  careInstructions: string;

  @IsOptional()
  @IsArray()
  tags: string[];

  @IsOptional()
  @IsString()
  metaTitle: string;

  @IsOptional()
  @IsString()
  metaDescription: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsArray()
  images: Array<{ url: string; alt: string; isPrimary: boolean }>;
}

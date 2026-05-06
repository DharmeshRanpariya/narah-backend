import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

  @Prop()
  sku: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  shortDescription: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ type: Number })
  salePrice: number;

  @Prop({ required: true, type: Number })
  stockQuantity: number;

  @Prop({ type: Number, default: 5 })
  lowStockThreshold: number;

  @Prop({
    type: [
      {
        url: String,
        alt: String,
        isPrimary: { type: Boolean, default: false },
      },
    ],
    default: [],
  })
  images: Array<{ url: string; alt: string; isPrimary: boolean }>;

  @Prop()
  material: string;

  @Prop()
  weight: string;

  @Prop()
  dimensions: string;

  @Prop()
  careInstructions: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: { average: Number, count: Number }, default: { average: 0, count: 0 } })
  ratings: { average: number; count: number };

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop()
  metaTitle: string;

  @Prop()
  metaDescription: string;

  @Prop()
  slug: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

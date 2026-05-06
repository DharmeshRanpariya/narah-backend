import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  icon: string;

  @Prop({ type: Number, default: 0 })
  displayOrder: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

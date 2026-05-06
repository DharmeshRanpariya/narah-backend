import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GalleryDocument = GalleryItem & Document;

@Schema({ timestamps: true })
export class GalleryItem {
  @Prop({ enum: ['photo', 'reel'], required: true })
  type: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop({ type: Number, default: 0 })
  displayOrder: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const GallerySchema = SchemaFactory.createForClass(GalleryItem);

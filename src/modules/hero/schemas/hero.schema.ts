import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HeroSlideDocument = HeroSlide & Document;

@Schema({ timestamps: true })
export class HeroSlide {
  @Prop({ required: true })
  url: string;

  @Prop()
  eyebrow: string;

  @Prop()
  title: string;

  @Prop()
  subtitle: string;

  @Prop()
  ctaText: string;

  @Prop()
  ctaLink: string;

  @Prop({ type: Number, default: 0 })
  displayOrder: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const HeroSchema = SchemaFactory.createForClass(HeroSlide);

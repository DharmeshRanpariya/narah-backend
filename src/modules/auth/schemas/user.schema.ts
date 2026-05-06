import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  phone: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  lastLogin: Date;

  @Prop({ type: String, default: null })
  otp: string | null;

  @Prop({ type: Date, default: null })
  otpExpiry: Date | null;

  @Prop({ type: Number, default: 0 })
  otpAttempts: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

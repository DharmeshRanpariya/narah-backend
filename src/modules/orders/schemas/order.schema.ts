import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, unique: true })
  orderNumber: string;

  @Prop()
  sessionId: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  email: string;

  @Prop({
    type: [
      {
        productId: { type: Types.ObjectId, ref: 'Product' },
        productName: String,
        price: Number,
        quantity: Number,
        images: [String],
      },
    ],
    default: [],
  })
  items: Array<{
    productId: Types.ObjectId;
    productName: string;
    price: number;
    quantity: number;
    images: string[];
  }>;

  @Prop({ required: true, type: Number })
  totalAmount: number;

  @Prop({ enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' })
  status: string;

  @Prop()
  whatsappMessage: string;

  @Prop()
  whatsappMessageId: string;

  @Prop()
  adminNotes: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true, unique: true })
  sessionId: string;

  @Prop({
    type: [
      {
        productId: { type: Types.ObjectId, ref: 'Product' },
        quantity: Number,
        addedAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  items: Array<{
    productId: Types.ObjectId;
    quantity: number;
    addedAt: Date;
  }>;

  @Prop({ type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })
  expiresAt: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
CartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

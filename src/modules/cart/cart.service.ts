import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from './schemas/cart.schema';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private productsService: ProductsService,
  ) {}

  async addItem(sessionId: string, productId: string, quantity: number) {
    await this.productsService.findById(productId);

    let cart = await this.cartModel.findOne({ sessionId });

    if (!cart) {
      cart = new this.cartModel({
        sessionId,
        items: [{ productId: new Types.ObjectId(productId), quantity, addedAt: new Date() }],
      });
    } else {
      const existingItem = cart.items.find((item) => item.productId.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId: new Types.ObjectId(productId), quantity, addedAt: new Date() });
      }
    }

    return cart.save();
  }

  async getCart(sessionId: string) {
    const cart = await this.cartModel.findOne({ sessionId }).populate('items.productId');

    if (!cart) {
      return { items: [], total: 0 };
    }

    const total = cart.items.reduce((sum, item) => sum + (item as any).productId.price * item.quantity, 0);

    return { ...cart.toObject(), total };
  }

  async updateItem(sessionId: string, productId: string, quantity: number) {
    const cart = await this.cartModel.findOne({ sessionId });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) {
      throw new NotFoundException('Item not found in cart');
    }

    item.quantity = quantity;
    return cart.save();
  }

  async removeItem(sessionId: string, productId: string) {
    const cart = await this.cartModel.findOne({ sessionId });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    return cart.save();
  }

  async clearCart(sessionId: string) {
    const cart = await this.cartModel.findOne({ sessionId });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.items = [];
    return cart.save();
  }
}

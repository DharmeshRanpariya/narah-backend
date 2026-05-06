import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private cartService: CartService,
    private productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const cart = await this.cartService.getCart(createOrderDto.sessionId);

    if (!cart.items || cart.items.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    const items = await Promise.all(
      cart.items.map(async (item) => {
        const product = await this.productsService.findById(item.productId.toString());
        return {
          productId: item.productId,
          productName: product.name,
          price: product.price,
          quantity: item.quantity,
          images: product.images.map((img) => img.url),
        };
      }),
    );

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderNumber = `ORD-${Date.now()}`;

    const whatsappMessage = this.generateWhatsappMessage(items, totalAmount, createOrderDto.phone);

    const order = new this.orderModel({
      orderNumber,
      sessionId: createOrderDto.sessionId,
      phone: createOrderDto.phone,
      email: createOrderDto.email,
      items,
      totalAmount,
      whatsappMessage,
      status: 'pending',
    });

    await order.save();
    await this.cartService.clearCart(createOrderDto.sessionId);

    return {
      order,
      whatsappLink: `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`,
    };
  }

  async findById(id: string) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async findAll(filters: any) {
    const { page = 1, limit = 10, status } = filters;
    const query: any = {};

    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const total = await this.orderModel.countDocuments(query);
    const orders = await this.orderModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async updateStatus(id: string, updateStatusDto: UpdateOrderStatusDto) {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      {
        status: updateStatusDto.status,
        adminNotes: updateStatusDto.adminNotes,
      },
      { new: true },
    );

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  private generateWhatsappMessage(items: any[], totalAmount: number, phone: string): string {
    let message = `Hello! 👋\n\nI would like to place an order:\n\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.productName}\n   Quantity: ${item.quantity}\n   Price: Rs. ${item.price}\n\n`;
    });

    message += `---\nTotal Amount: Rs. ${totalAmount}\n\nPhone: ${phone}\n\nPlease confirm my order.`;

    return message;
  }
}

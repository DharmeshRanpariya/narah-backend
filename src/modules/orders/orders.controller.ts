import { Controller, Get, Post, Put, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/create-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create order from cart' })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order details' })
  async getOrder(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all orders (admin only)' })
  async getAllOrders(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status: string,
  ) {
    return this.ordersService.findAll({ page, limit, status });
  }

  @Put(':id/status')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update order status (admin only)' })
  async updateOrderStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, updateStatusDto);
  }
}

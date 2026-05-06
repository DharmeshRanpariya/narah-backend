import { Controller, Get, Post, Put, Delete, Body, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/add-to-cart.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Add item to cart' })
  async addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addItem(addToCartDto.sessionId, addToCartDto.productId, addToCartDto.quantity);
  }

  @Get()
  @ApiOperation({ summary: 'Get cart items' })
  async getCart(@Query('sessionId') sessionId: string) {
    return this.cartService.getCart(sessionId);
  }

  @Put(':itemId')
  @ApiOperation({ summary: 'Update cart item quantity' })
  async updateCartItem(
    @Query('sessionId') sessionId: string,
    @Param('itemId') itemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(sessionId, itemId, updateCartItemDto.quantity);
  }

  @Delete(':itemId')
  @ApiOperation({ summary: 'Remove item from cart' })
  async removeFromCart(@Query('sessionId') sessionId: string, @Param('itemId') itemId: string) {
    return this.cartService.removeItem(sessionId, itemId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear entire cart' })
  async clearCart(@Query('sessionId') sessionId: string) {
    return this.cartService.clearCart(sessionId);
  }
}

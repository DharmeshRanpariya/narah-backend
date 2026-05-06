import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with filters and pagination' })
  async getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 12,
    @Query('categoryId') categoryId: string,
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
    @Query('sortBy') sortBy: string = 'featured',
    @Query('search') search: string,
  ) {
    return this.productsService.findAll({
      page,
      limit,
      categoryId,
      minPrice,
      maxPrice,
      sortBy,
      search,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product details' })
  async getProduct(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create product (admin only)' })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product (admin only)' })
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product (admin only)' })
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.delete(id);
  }

  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Get products by category' })
  async getProductsByCategory(@Param('categoryId') categoryId: string) {
    return this.productsService.findByCategory(categoryId);
  }
}

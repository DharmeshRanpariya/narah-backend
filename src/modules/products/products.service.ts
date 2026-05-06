import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async findAll(filters: any) {
    const pageNum = Math.max(1, parseInt(filters.page) || 1);
    const limitNum = Math.max(1, parseInt(filters.limit) || 12);
    const { categoryId, sortBy = 'featured', search } = filters;
    const minPrice = filters.minPrice ? parseFloat(filters.minPrice) : null;
    const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice) : null;

    const query: any = { isActive: true };

    if (categoryId && categoryId !== '') {
      query.categoryId = categoryId;
    }

    if (minPrice !== null || maxPrice !== null) {
      query.price = {};
      if (minPrice !== null) query.price.$gte = minPrice;
      if (maxPrice !== null) query.price.$lte = maxPrice;
    }

    if (search && search !== '') {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    let sortOption: any = { createdAt: -1 };
    if (sortBy === 'price-low') sortOption = { price: 1 };
    if (sortBy === 'price-high') sortOption = { price: -1 };
    if (sortBy === 'newest') sortOption = { createdAt: -1 };
    if (sortBy === 'rating') sortOption = { 'ratings.average': -1 };
    if (sortBy === 'featured') sortOption = { 'ratings.average': -1, createdAt: -1 };

    const skip = (pageNum - 1) * limitNum;
    const total = await this.productModel.countDocuments(query);
    const products = await this.productModel
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .exec();

    return {
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    };
  }

  async findById(id: string) {
    const product = await this.productModel.findById(id).populate('categoryId');
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const existing = await this.productModel.findOne({ name: createProductDto.name });
    if (existing) {
      throw new BadRequestException('Product with this name already exists');
    }

    const slug = createProductDto.slug || createProductDto.name.toLowerCase().replace(/\s+/g, '-');
    const product = new this.productModel({ ...createProductDto, slug });
    return product.save();
  }

  async update(id: string, updateProductDto: CreateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async delete(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return { message: 'Product deleted successfully' };
  }

  async findByCategory(categoryId: string) {
    return this.productModel.find({ categoryId, isActive: true }).limit(10);
  }
}

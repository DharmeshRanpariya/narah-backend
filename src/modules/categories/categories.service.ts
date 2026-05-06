import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async findAll() {
    return this.categoryModel.find().sort({ displayOrder: 1 });
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const existing = await this.categoryModel.findOne({ name: createCategoryDto.name });
    if (existing) {
      throw new BadRequestException('Category with this name already exists');
    }
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async update(id: string, updateCategoryDto: CreateCategoryDto) {
    const category = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async delete(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return { message: 'Category deleted successfully' };
  }
}

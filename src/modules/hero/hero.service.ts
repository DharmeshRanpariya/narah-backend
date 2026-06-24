import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HeroSlide } from './schemas/hero.schema';
import { CreateHeroSlideDto } from './dto/create-hero.dto';

@Injectable()
export class HeroService {
  constructor(@InjectModel(HeroSlide.name) private heroModel: Model<HeroSlide>) {}

  async findAll() {
    return this.heroModel.find({ isActive: true }).sort({ displayOrder: 1, createdAt: 1 });
  }

  async findById(id: string) {
    const slide = await this.heroModel.findById(id);
    if (!slide) {
      throw new NotFoundException('Hero slide not found');
    }
    return slide;
  }

  async create(createHeroSlideDto: CreateHeroSlideDto) {
    const slide = new this.heroModel(createHeroSlideDto);
    return slide.save();
  }

  async update(id: string, updateHeroSlideDto: CreateHeroSlideDto) {
    const slide = await this.heroModel.findByIdAndUpdate(id, updateHeroSlideDto, { new: true });
    if (!slide) {
      throw new NotFoundException('Hero slide not found');
    }
    return slide;
  }

  async delete(id: string) {
    const slide = await this.heroModel.findByIdAndDelete(id);
    if (!slide) {
      throw new NotFoundException('Hero slide not found');
    }
    return { message: 'Hero slide deleted successfully' };
  }
}

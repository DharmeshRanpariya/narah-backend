import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GalleryItem } from './schemas/gallery.schema';
import { CreateGalleryItemDto } from './dto/create-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(@InjectModel(GalleryItem.name) private galleryModel: Model<GalleryItem>) {}

  async findAll(filters: any) {
    const { type, category } = filters;
    const query: any = { isActive: true };

    if (type) query.type = type;
    if (category) query.category = category;

    return this.galleryModel.find(query).sort({ displayOrder: 1 });
  }

  async findById(id: string) {
    const item = await this.galleryModel.findById(id);
    if (!item) {
      throw new NotFoundException('Gallery item not found');
    }
    return item;
  }

  async create(createGalleryItemDto: CreateGalleryItemDto) {
    const item = new this.galleryModel(createGalleryItemDto);
    return item.save();
  }

  async update(id: string, updateGalleryItemDto: CreateGalleryItemDto) {
    const item = await this.galleryModel.findByIdAndUpdate(id, updateGalleryItemDto, { new: true });
    if (!item) {
      throw new NotFoundException('Gallery item not found');
    }
    return item;
  }

  async delete(id: string) {
    const item = await this.galleryModel.findByIdAndDelete(id);
    if (!item) {
      throw new NotFoundException('Gallery item not found');
    }
    return { message: 'Gallery item deleted successfully' };
  }
}

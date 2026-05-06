import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { GalleryItem, GallerySchema } from './schemas/gallery.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: GalleryItem.name, schema: GallerySchema }])],
  controllers: [GalleryController],
  providers: [GalleryService],
  exports: [GalleryService],
})
export class GalleryModule {}

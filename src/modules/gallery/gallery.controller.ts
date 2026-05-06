import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GalleryService } from './gallery.service';
import { CreateGalleryItemDto } from './dto/create-gallery.dto';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all gallery items with optional filters' })
  async getGalleryItems(@Query('type') type: string, @Query('category') category: string) {
    return this.galleryService.findAll({ type, category });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gallery item details' })
  async getGalleryItem(@Param('id') id: string) {
    return this.galleryService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create gallery item (admin only)' })
  async createGalleryItem(@Body() createGalleryItemDto: CreateGalleryItemDto) {
    return this.galleryService.create(createGalleryItemDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update gallery item (admin only)' })
  async updateGalleryItem(@Param('id') id: string, @Body() updateGalleryItemDto: CreateGalleryItemDto) {
    return this.galleryService.update(id, updateGalleryItemDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete gallery item (admin only)' })
  async deleteGalleryItem(@Param('id') id: string) {
    return this.galleryService.delete(id);
  }
}

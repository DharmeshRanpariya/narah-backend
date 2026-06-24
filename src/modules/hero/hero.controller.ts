import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HeroService } from './hero.service';
import { CreateHeroSlideDto } from './dto/create-hero.dto';

@ApiTags('Hero')
@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  @ApiOperation({ summary: 'Get all hero slides' })
  async getHeroSlides() {
    return this.heroService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get hero slide details' })
  async getHeroSlide(@Param('id') id: string) {
    return this.heroService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create hero slide (admin only)' })
  async createHeroSlide(@Body() createHeroSlideDto: CreateHeroSlideDto) {
    return this.heroService.create(createHeroSlideDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update hero slide (admin only)' })
  async updateHeroSlide(@Param('id') id: string, @Body() updateHeroSlideDto: CreateHeroSlideDto) {
    return this.heroService.update(id, updateHeroSlideDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete hero slide (admin only)' })
  async deleteHeroSlide(@Param('id') id: string) {
    return this.heroService.delete(id);
  }
}

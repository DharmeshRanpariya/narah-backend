import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';
import { HeroSlide, HeroSchema } from './schemas/hero.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: HeroSlide.name, schema: HeroSchema }])],
  controllers: [HeroController],
  providers: [HeroService],
  exports: [HeroService],
})
export class HeroModule {}

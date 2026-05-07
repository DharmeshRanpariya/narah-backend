import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ContactModule } from './modules/contact/contact.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    NestConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ConfigModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb+srv://narahsilver:narahsilver@123@cluster0.nfvo4az.mongodb.net/narah-store?appName=Cluster0',
    ),
    AuthModule,
    ProductsModule,
    CategoriesModule,
    GalleryModule,
    CartModule,
    OrdersModule,
    ContactModule,
    UploadModule,
  ],
})
export class AppModule {}

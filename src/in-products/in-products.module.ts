import { Module } from '@nestjs/common';
import { InProductsService } from './in-products.service';
import { InProductsController } from './in-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from 'src/products/entities';
import { InProduct } from './entities/in-product.entity';

@Module({
  controllers: [InProductsController],
  providers: [InProductsService],
  imports: [
    TypeOrmModule.forFeature([ Product,  InProduct ]),
    AuthModule,
  ],
})
export class InProductsModule {}

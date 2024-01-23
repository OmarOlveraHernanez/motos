import { Module } from '@nestjs/common';
import { OutProductsService } from './out-products.service';
import { OutProductsController } from './out-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { OutProduct } from './entities/out-product.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OutProductsController],
  providers: [OutProductsService],
  imports: [
    TypeOrmModule.forFeature([ Product,  OutProduct ]),
    AuthModule,
  ],
})

export class OutProductsModule {}

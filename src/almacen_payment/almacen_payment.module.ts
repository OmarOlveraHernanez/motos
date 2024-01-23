import { Module } from '@nestjs/common';
import { AlmacenPaymentService } from './almacen_payment.service';
import { AlmacenPaymentController } from './almacen_payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Almacen } from 'src/almacen/entities/almacen.entity';
import { AlmacenPayment } from './entities/almacen_payment.entity';

@Module({
  controllers: [AlmacenPaymentController],
  providers: [AlmacenPaymentService],
  imports: [
    TypeOrmModule.forFeature([ Almacen,  AlmacenPayment ]),
    AuthModule,
  ],
})
export class AlmacenPaymentModule {}

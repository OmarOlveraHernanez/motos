import { Module } from '@nestjs/common';
import { AlmacenService } from './almacen.service';
import { AlmacenController } from './almacen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Almacen } from './entities/almacen.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AlmacenPayment } from 'src/almacen_payment/entities/almacen_payment.entity';


@Module({
  controllers: [AlmacenController],
  imports: [
    TypeOrmModule.forFeature([ Almacen , AlmacenPayment ]),
    AuthModule,
  ],
  exports: [
    AlmacenService,
    TypeOrmModule,
  ],
  providers: [AlmacenService],
})
export class AlmacenModule {}

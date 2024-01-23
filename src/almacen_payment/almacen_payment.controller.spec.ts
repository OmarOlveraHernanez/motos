import { Test, TestingModule } from '@nestjs/testing';
import { AlmacenPaymentController } from './almacen_payment.controller';
import { AlmacenPaymentService } from './almacen_payment.service';

describe('AlmacenPaymentController', () => {
  let controller: AlmacenPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlmacenPaymentController],
      providers: [AlmacenPaymentService],
    }).compile();

    controller = module.get<AlmacenPaymentController>(AlmacenPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

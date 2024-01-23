import { Test, TestingModule } from '@nestjs/testing';
import { AlmacenPaymentService } from './almacen_payment.service';

describe('AlmacenPaymentService', () => {
  let service: AlmacenPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlmacenPaymentService],
    }).compile();

    service = module.get<AlmacenPaymentService>(AlmacenPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

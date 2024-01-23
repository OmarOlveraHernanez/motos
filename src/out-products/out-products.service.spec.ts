import { Test, TestingModule } from '@nestjs/testing';
import { OutProductsService } from './out-products.service';

describe('OutProductsService', () => {
  let service: OutProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutProductsService],
    }).compile();

    service = module.get<OutProductsService>(OutProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

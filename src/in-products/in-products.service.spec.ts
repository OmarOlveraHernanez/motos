import { Test, TestingModule } from '@nestjs/testing';
import { InProductsService } from './in-products.service';

describe('InProductsService', () => {
  let service: InProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InProductsService],
    }).compile();

    service = module.get<InProductsService>(InProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { InProductsController } from './in-products.controller';
import { InProductsService } from './in-products.service';

describe('InProductsController', () => {
  let controller: InProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InProductsController],
      providers: [InProductsService],
    }).compile();

    controller = module.get<InProductsController>(InProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { OutProductsController } from './out-products.controller';
import { OutProductsService } from './out-products.service';

describe('OutProductsController', () => {
  let controller: OutProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutProductsController],
      providers: [OutProductsService],
    }).compile();

    controller = module.get<OutProductsController>(OutProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

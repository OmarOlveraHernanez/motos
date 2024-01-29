import { Test, TestingModule } from '@nestjs/testing';
import { PendingMotorcycleController } from './pending_motorcycle.controller';
import { PendingMotorcycleService } from './pending_motorcycle.service';

describe('PendingMotorcycleController', () => {
  let controller: PendingMotorcycleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PendingMotorcycleController],
      providers: [PendingMotorcycleService],
    }).compile();

    controller = module.get<PendingMotorcycleController>(PendingMotorcycleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

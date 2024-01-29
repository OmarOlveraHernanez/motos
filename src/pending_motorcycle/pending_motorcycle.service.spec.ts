import { Test, TestingModule } from '@nestjs/testing';
import { PendingMotorcycleService } from './pending_motorcycle.service';

describe('PendingMotorcycleService', () => {
  let service: PendingMotorcycleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PendingMotorcycleService],
    }).compile();

    service = module.get<PendingMotorcycleService>(PendingMotorcycleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

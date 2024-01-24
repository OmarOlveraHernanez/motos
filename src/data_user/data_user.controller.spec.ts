import { Test, TestingModule } from '@nestjs/testing';
import { DataUserController } from './data_user.controller';
import { DataUserService } from './data_user.service';

describe('DataUserController', () => {
  let controller: DataUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataUserController],
      providers: [DataUserService],
    }).compile();

    controller = module.get<DataUserController>(DataUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

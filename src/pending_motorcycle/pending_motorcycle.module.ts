import { Module } from '@nestjs/common';
import { PendingMotorcycleService } from './pending_motorcycle.service';
import { PendingMotorcycleController } from './pending_motorcycle.controller';

@Module({
  controllers: [PendingMotorcycleController],
  providers: [PendingMotorcycleService]
})
export class PendingMotorcycleModule {}

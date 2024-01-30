import { Module } from '@nestjs/common';
import { PendingMotorcycleService } from './pending_motorcycle.service';
import { PendingMotorcycleController } from './pending_motorcycle.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hub } from 'src/hub/entities/hub.entity';
import { PendingMotorcycle } from './entities/pending_motorcycle.entity';

@Module({
  controllers: [PendingMotorcycleController],
  providers: [PendingMotorcycleService],
  imports: [
    TypeOrmModule.forFeature([ Hub ,PendingMotorcycle ]),
    AuthModule,
  ]
})
export class PendingMotorcycleModule {}

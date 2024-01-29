import { Module } from '@nestjs/common';
import { HubService } from './hub.service';
import { HubController } from './hub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hub } from './entities/hub.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [HubController],
  providers: [HubService],
  imports: [
    TypeOrmModule.forFeature([ Hub  ]),
    AuthModule,
  ]
})
export class HubModule {}

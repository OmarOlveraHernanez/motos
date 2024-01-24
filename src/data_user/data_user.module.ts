import { Module } from '@nestjs/common';
import { DataUserService } from './data_user.service';
import { DataUserController } from './data_user.controller';

@Module({
  controllers: [DataUserController],
  providers: [DataUserService]
})
export class DataUserModule {}

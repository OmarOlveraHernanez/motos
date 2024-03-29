import { Module } from '@nestjs/common';
import { DataUserService } from './data_user.service';
import { DataUserController } from './data_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { DataUser } from './entities/data_user.entity';
import { AuthModule } from './../auth/auth.module';

@Module({
  controllers: [DataUserController],
  providers: [DataUserService],
  imports:[
    TypeOrmModule.forFeature([ User  ,DataUser ]),
    AuthModule,
  ]
})
export class DataUserModule {}

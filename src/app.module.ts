import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';


import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';
import { DataUserModule } from './data_user/data_user.module';
import { HubModule } from './hub/hub.module';
import { PendingMotorcycleModule } from './pending_motorcycle/pending_motorcycle.module';


require('dotenv').config();
const DB_HOST = process.env.DB_HOST;
const DB_PORT = +process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
      username: DB_USER,
      password: DB_PASSWORD,      
      autoLoadEntities: true,
      synchronize: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), 
    }),

   

    CommonModule,

    SeedModule,

    FilesModule,

    AuthModule,

    MessagesWsModule,

    DataUserModule,

    HubModule,

    PendingMotorcycleModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { RedisModule} from 'nestjs-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {join} from 'path';
import { CrawlerModule } from './module/crawler.module';
import { SystemConfig } from './model/entity/mysql/config.entity';

@Module({
  imports: [
    LoggerModule.forRoot(),
    TypeOrmModule.forRoot(
      {
        name: 'mongoCon',
        type: 'mongodb',
        host: '127.0.0.1',
        port: 27017,
        useNewUrlParser: true,
        database: 'b_simple_crawlers_center',
        synchronize: true,
        entities: [join(__dirname, '**/mongo/**.entity{.ts,.js}')],
      },
    ),
    TypeOrmModule.forRoot(
      {
        name: 'mysqlCon',
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'b_simple_config_center',
        entities: [join(__dirname, '**/mysql/**.entity{.ts,.js}')],
        synchronize: true,
      },
    ),
   CrawlerModule, TypeOrmModule.forFeature([SystemConfig], 'mysqlCon'),
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class MainModule {}

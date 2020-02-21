import { Module } from '@nestjs/common';
import { MainModule } from './main.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemConfig } from './model/entity/mysql/config.entity';

@Module({
  imports: [
    MainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

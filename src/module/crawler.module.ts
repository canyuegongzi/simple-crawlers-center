import { forwardRef, HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../common/auth/auth.module';
import { CrawlerController } from '../controller/crawler.controller';
import { CrawlerService } from '../service/service/crawler.service';
import { NewsCategory } from '../model/entity/mongo/newsCategory.entity';
import { News } from '../model/entity/mongo/news.entity';
import { Joke } from '../model/entity/mongo/joke.entity';
import { WxNews } from '../model/entity/mongo/wxNews.entity';
import { Day } from '../model/entity/mongo/day.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Joke, News, NewsCategory, WxNews, Day], 'mongoCon'),
    HttpModule,
  ],
  controllers: [CrawlerController],
  providers: [CrawlerService],
  exports: [],
})
export class CrawlerModule {}

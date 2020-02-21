import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, Index, ManyToOne, MongoRepository, Repository } from 'typeorm';
import { Joke } from '../../model/entity/mongo/joke.entity';
import { News } from '../../model/entity/mongo/news.entity';
import { NewsCategory } from '../../model/entity/mongo/newsCategory.entity';
import { Api, config } from '../../config/config';
import { ApiException } from '../../common/error/exceptions/api.exception';
import { ApiErrorCode } from '../../config/api-error-code.enum';
import { WxNews } from '../../model/entity/mongo/wxNews.entity';
import { Day } from '../../model/entity/mongo/day.entity';
// tslint:disable-next-line:no-var-requires
const fnv = require('fnv-plus');

@Injectable()
export class CrawlerService {
  public cateGory = {};
  constructor(
    @InjectRepository(Joke) private readonly jokeRepository: MongoRepository<Joke>,
    @InjectRepository(News) private readonly newsRepository: MongoRepository<News>,
    @InjectRepository(NewsCategory) private readonly newsCategoryRepository: MongoRepository<NewsCategory>,
    @InjectRepository(WxNews) private readonly wxNewsRepository: MongoRepository<WxNews>,
    @InjectRepository(Day) private readonly dayRepository: MongoRepository<Day>,
    private readonly httpService: HttpService,
  ) {
    this.cateGory = {};
  }

  /**
   * 查询新闻
   */
  async getNewsCrawlerData(params: any, url: string) {
    let category: any = null;
    try {
      category = await this.getCategoryData();
      category[0].forEach((item) => {
          this.cateGory[item.name] = item;
      });
    } catch (e) {
      return { success: false, data: null, message: 'fail' };
    }
    try {
      const data = category[0];
      for (let i = 0; i < data.length; i ++ ) {
        const currentData = await this.httpService
          .get(url, {params: { key: Api.NewsToken, type: data[i].code }})
          .toPromise();
        if (currentData.status == 200) {
          const result = await this.saveNews(currentData.data);
        } else {
          throw new ApiException('爬取失败', ApiErrorCode.ORIZATION_CREATED_FILED, 200);
        }
      }
      return { success: true, message: '操作成功', result: 'success' };
    } catch (e) {
      return { success: false, data: null, message: 'fail' };
    }
  }

  /**
   * 获取微信新闻
   * @param params
   * @param url
   */
  async getWxNewsCrawlerData(params: any, url: string) {
    try {
      for (let i = 1; i < 5; i ++ ) {
        const currentData = await this.httpService
          .get(url, {params: { key: Api.WxToken, pno: i, ps: 50 }})
          .toPromise();
        if (currentData.data.error_code == 0 && currentData.data.result.list.length < 1) {
                break;
        }
        if (currentData.status == 200) {
              const result = await this.saveWx(currentData.data);
        } else {
          throw new ApiException('爬取失败', ApiErrorCode.ORIZATION_CREATED_FILED, 200);
        }
      }
      return { success: true, message: '操作成功', result: 'success' };
    } catch (e) {
      return { success: false, data: null, message: 'fail' };
    }
  }

  /**
   * 获取历史上的今天
   * @param params
   * @param url
   */
  async getDayCrawlerData(params: any, url: string) {
    try {
        const currentData = await this.httpService
          .get(url, {params: { key: Api.DayToken, v: 1.0,  month: new Date().getMonth() + 1, day: new Date().getDate()}})
          .toPromise();
        if (currentData.status == 200) {
          const time = new Date()
          const str = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
          const result = await this.saveDay(currentData.data, str);
        } else {
          throw new ApiException('爬取失败', ApiErrorCode.ORIZATION_CREATED_FILED, 200);
        }

        return { success: true, message: '操作成功', result: 'success' };
    } catch (e) {
      return { success: false, data: null, message: 'fail' };
    }
  }

  /**
   * 构建Api
   */
  getApi(apiKey) {
      const url = apiKey.split('/')[2].split('get')[1];
      const urlApi = {
          ...Api,
      };
      console.log(url);
      return urlApi[url + 'Api'];
  }
  /**
   * 保存新闻数据
   */
  public async saveNews(data: any) {
      const resData = data.result.stat == '1' ?  data.result.data : [];
      try {
          for (let i = 0 ; i < resData.length; i ++ ) {
            try {
                const obj = {
                  // _id: fnv.hash(resData[i].title, 64),
                  title: resData[i].title,
                  date: resData[i].date,
                  authorName: resData[i].author_name,
                  url: resData[i].url,
                  pic: resData[i].thumbnail_pic_s + '|' + resData[i].thumbnail_pic_s02 + '|' + resData[i].thumbnail_pic_s03,
                  newsCategory: resData[i].category,
                  uniqueHashKey: resData[i].uniquekey,
                };
                const res = await this.newsRepository.updateOne( { uniqueHashKey: resData[i].uniquekey }, { $set: obj }, { upsert: true });
            } catch (e) {
                return true;
                continue;
            }
          }
      } catch (e) {
        throw new ApiException('写入失败', ApiErrorCode.ORIZATION_CREATED_FILED, 200);
      }
  }

  /**
   * 保存笑话数据
   */
  public async saveJoke(data: any) {
    const resData = data.result.stat == '1' ?  data.result.data : [];
    const that = this;
    try {
      for (let i = 0 ; i < resData.length; i ++ ) {
        try {
          const obj = {
            // _id: fnv.hash(resData[i].title, 64),
            title: resData[i].title,
            date: resData[i].date,
            authorName: resData[i].author_name,
            url: resData[i].url,
            pic: resData[i].thumbnail_pic_s + '|' + resData[i].thumbnail_pic_s02 + '|' + resData[i].thumbnail_pic_s03,
            newsCategory: resData[i].category,
            uniqueHashKey: resData[i].uniquekey,
          };
          const res = await this.newsRepository.updateOne( { uniqueHashKey: resData[i].uniquekey }, { $set: obj }, { upsert: true });
        } catch (e) {
          return true;
          continue;
        }
      }
    } catch (e) {
      throw new ApiException('写入失败', ApiErrorCode.ORIZATION_CREATED_FILED, 200);
    }
  }

  /**
   * 保存微信数据
   */
  public async saveWx(data: any) {
    const resData = data.error_code == 0 ?  data.result.list : [];
    const that = this;
    try {
      for (let i = 0 ; i < resData.length; i ++ ) {
        try {
          const obj = {
            title: resData[i].title,
            date: resData[i].date || new Date().getTime(),
            authorName: resData[i].source || '',
            url: resData[i].url,
            pic: resData[i].firstImg,
            uniqueHashKey: resData[i].id,
          };
          const res = await this.wxNewsRepository.updateOne( { uniqueHashKey: resData[i].id }, { $set: obj }, { upsert: true });
        } catch (e) {
          return true;
          continue;
        }
      }
    } catch (e) {
      throw new ApiException('写入失败', ApiErrorCode.ORIZATION_CREATED_FILED, 200);
    }
  }

  /**
   * 保存历史的今天
   */
  public async saveDay(data: any, time: string) {
    const resData = data.result ?  data.result : [];
    try {
        try {
          const obj = {
            // _id: fnv.hash(resData[i].title, 64),
            title: new Date().getTime(),
            date: time,
            content: JSON.stringify(resData),
            uniqueHashKey: fnv.hash(new Date(time).getTime() + '', 64).value,
          };
          const res = await this.dayRepository.updateOne( { uniqueHashKey: obj.uniqueHashKey }, { $set: obj }, { upsert: true });
        } catch (e) {
          return true;
        }
    } catch (e) {
      throw new ApiException('写入失败', ApiErrorCode.ORIZATION_CREATED_FILED, 200);
    }
  }

  /**
   * 获取新闻分类
   */
  public async getCategoryData(flag = 1) {
    return this.newsCategoryRepository.findAndCount({ flag});
  }

  /**
   * 添加新闻分类
   */
  public async addNewsCategory(name: any, code: any) {
    try {
        const currentName = await this.newsCategoryRepository.find({name});
        if (currentName.length) {
          return await this.newsCategoryRepository.updateOne({name}, { $set: { name, code } }, { upsert: true});
        } else {
          return await this.newsCategoryRepository.insert( { name, flag: 1, code });
        }
    } catch (e) {
        throw new ApiException('类别添加失败', ApiErrorCode.USER_LIST_FILED, 200);
    }
  }
}

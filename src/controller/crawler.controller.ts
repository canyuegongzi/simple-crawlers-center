import { Body, Controller, Get, Inject, Post, Query, Req, Session, UseGuards, Request, UseInterceptors, HttpCode, Header } from '@nestjs/common';
import { TransformInterceptor } from '../common/shared/interceptors/transform.interceptor';
import { LoggingInterceptor } from '../common/shared/interceptors/logging.interceptor';
import { CrawlerService } from '../service/service/crawler.service';

@Controller('crawler')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CrawlerController {
  constructor(
    @Inject(CrawlerService) private readonly crawlerService: CrawlerService,
  ) {}

  /**
   * 获取头条新闻
   * @param params
   * @param req
   */
  @Post('getNews')
  public async getNewsCrawlerData(@Body('key') params: string, @Request() req: any) {
    const url = req._parsedOriginalUrl.pathname;
    try {
      const ajaxApi = this.crawlerService.getApi(url);
      const res = await this.crawlerService.getNewsCrawlerData(params, ajaxApi);
      return {code: 200, data: res, message: '操作成功', success: true};
    } catch (e) {
      return {code: 200,  message: '操作失败', success: false};
    }
  }

  /**
   * 获取微信新闻
   * @param params
   * @param req
   */
  @Post('getWxNews')
  public async getWxNewsCrawlerData(@Body('key') params: string, @Request() req: any) {
    const url = req._parsedOriginalUrl.pathname;
    try {
      const ajaxApi = this.crawlerService.getApi(url);
      const res = await this.crawlerService.getWxNewsCrawlerData(params, ajaxApi);
      return {code: 200, data: res, message: '操作成功', success: true};
    } catch (e) {
      return {code: 200,  message: '操作失败', success: false};
    }
  }

  /**
   * 获取历史上的今天
   * @param params
   * @param req
   */
  @Post('getDay')
  public async getDayCrawlerData(@Body('key') params: string, @Request() req: any) {
    const url = req._parsedOriginalUrl.pathname;
    try {
      const ajaxApi = this.crawlerService.getApi(url);
      const res = await this.crawlerService.getDayCrawlerData(params, ajaxApi);
      return {code: 200, data: res, message: '操作成功', success: true};
    } catch (e) {
      return {code: 200,  message: '操作失败', success: false};
    }
  }

  /**
   * 查询数据Api
   * @param params
   * @param req
   */
  @Post('getApi')
  public async test(@Body('key') params: string, @Request() req: any) {
    return {code: 200,  message: '操作成功', success: true};
  }

  /**
   * 添加新闻类型
   * @param params
   */
  @Post('addNewsCategory')
  public async addNewsCategory(@Body() params: any) {
    try {
      const res = await this.crawlerService.addNewsCategory(params.name, params.code);
      return {code: 200,  message: '操作成功', success: true};
    } catch (e) {
      return {code: 200,  message: '操作失败', success: false};
    }
  }
}

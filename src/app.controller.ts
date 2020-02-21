import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { scheduleTask } from './utils/schedule';
// tslint:disable-next-line:no-var-requires
const querystring = require('querystring');

// tslint:disable-next-line:no-var-requires
const schedule = require('node-schedule');

@Controller()
export class AppController {
  public time = null;
  constructor(private readonly appService: AppService) {}

  @Get()
  async schedule(@Query('userId') userId: any) {
    try {
      const currentConfig = await this.appService.getUserConfig(userId);
      const config = currentConfig.config;
      if (!config) {
        return false;
      }
      const reg = /^[\'\"]+|[\'\"]+$/g;
      const str = config.replace(reg, '');
      const cuConfig = querystring.parse(str, ',', null, { maxKeys: 20 });
      if (this.time) {
            this.time.cancel();
      }
      this.time = schedule.scheduleJob('30 * * * * *', () => {
        scheduleTask().then(res => {
        }).catch(err => {
          console.warn(err);
        });
      });
      console.log(this.time);
      return { success: false, data: cuConfig, message: 'success'};
    } catch (e) {
        return { success: false, message: 'fail'};
    }
  }
}

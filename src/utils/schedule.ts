import { HttpService } from '@nestjs/common';
import { Api, config } from '../config/config';
// tslint:disable-next-line:no-var-requires
const schedule = require('node-schedule');
/**
 * 定时任务
 */
export const scheduleTask = async () => {
  const http: HttpService = new HttpService();
  const url = `${config.http}:${config.port}`;
  return Promise.all([
  await http
    .post(`${url}/crawler/getDay`)
    .toPromise(),
  await http
    .post(`${url}/crawler/getNews`)
    .toPromise(),
  await http
    .post(`${url}/crawler/getWxNews`)
    .toPromise(),
  ]);
};

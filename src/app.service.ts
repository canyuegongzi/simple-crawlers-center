import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemConfig } from './model/entity/mysql/config.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(SystemConfig)
    private readonly systemConfigRepository: Repository<SystemConfig>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  /**
   * 获取用户系统的配置
   * @param userId
   */
  async getUserConfig(userId: string) {
      return this.systemConfigRepository.findOne({ userId });
  }
}

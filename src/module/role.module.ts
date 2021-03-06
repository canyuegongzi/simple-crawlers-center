import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../model/entity/mysql/role.entity';
import { RoleController } from '../controller/role.controller';
import { RoleService } from '../service/service/role.service';
import {Authority} from '../model/entity/mysql/authority.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Authority], 'mysqlCon'),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [],
})
export class RoleModule {}

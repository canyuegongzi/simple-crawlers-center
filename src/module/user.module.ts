import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserController } from '../controller/user.controller';
import { AuthModule } from '../common/auth/auth.module';
import { User } from '../model/entity/mysql/user.entity';
import { UserService } from '../service/service/user.service';
import {Role} from '../model/entity/mysql/role.entity';
import { Organization } from '../model/entity/mysql/organization.entity';
import { Authority } from '../model/entity/mysql/authority.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => AuthModule),   // 处理模块间的循环依赖
    TypeOrmModule.forFeature([User, Role], 'mysqlCon'),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

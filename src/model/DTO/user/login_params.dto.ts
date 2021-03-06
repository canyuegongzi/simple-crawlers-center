import { IsString } from 'class-validator';
import { ApiErrorCode } from '../../../config/api-error-code.enum';

export class LoginParamsDto {
    
  name: string;

  @IsString( { message: '用户名或者密码不正确', context: { errorCode: ApiErrorCode.USER_PASSWORD_FALSE } })
  password: string;
}

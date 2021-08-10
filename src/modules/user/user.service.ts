import { Injectable } from '@nestjs/common';
import { BaseCommonService } from 'src/common/base.common.service';
import { UserModel } from 'src/model/user.entity';

@Injectable()
export class UserService extends BaseCommonService {
  constructor() {
    super();
    this._model = UserModel;
  }
}

import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { Op } from 'sequelize';
import { UserModel } from 'src/models/user.entity';
import { ROLE_DEFAULT_ID } from 'src/shared/helper/constant';

@Injectable()
export class UserService {
  async readUserInfo(id: number) {
    return UserModel.findByPk(id, {});
  }
  async readUserByUserName(username: string, data?: any) {
    const whereData = {
      username: username,
    };
    if (data && data.notIds && data.notIds.length > 0) {
      whereData['id'] = {
        [Op.notIn]: data.notIds,
      };
    }
    return UserModel.findOne({
      where: whereData,
    });
  }

  async queryUser(params) {
    const roleIds: Array<any> = params.roleIds;
    const offset = (params.page - 1) * params.pageSize;
    const limit = params.pageSize;
    const userIds = params.userIds;
    const roleMemberCode = params.roleMemberCode;
    const filterString = params.filterString;

    const whereData = {};
    if (roleIds && roleIds.length > 0) {
      whereData['roleId'] = roleIds;
    }
    if (userIds && userIds.length > 0) {
      whereData['id'] = userIds;
    }
    if (roleMemberCode && roleMemberCode.length > 0) {
      whereData['roleMemberCode'] = roleMemberCode;
    }
    if (filterString && filterString.length > 0) {
      whereData['name'] = {
        [Op.iLike]: `%${filterString}%`,
      };
    }
    const { rows, count } = await UserModel.findAndCountAll({
      where: whereData,
      order: [['id', 'DESC']],
      offset: offset,
      limit: limit,
    });
    return {
      rows,
      count,
    };
  }

  async updateUserInfo(id: number, dataUpdate: any) {
    const updateValue = _.omitBy(dataUpdate, _.isNil);
    return UserModel.update(updateValue, {
      where: {
        id,
      },
    });
  }

  async updateUserAccountInfo(id: number, dataUpdate: any) {
    return UserModel.update(dataUpdate, {
      where: {
        id,
      },
    });
  }

  async deleteUser(id: number) {
    return UserModel.destroy({
      where: {
        id,
      },
    });
  }

  async createUser(dataCreate: any, transaction?) {
    if (dataCreate && !dataCreate.roleId) {
      dataCreate.roleId = ROLE_DEFAULT_ID;
    }
    return UserModel.create(dataCreate, {
      transaction,
    });
  }
}

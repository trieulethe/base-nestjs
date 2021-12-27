import { UserModel } from '../../entities/user.entity';
import { StoreModel } from '../../entities/store.entity';

import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { ROLE_DEFAULT_ID, USER_STATUS } from '../../shared/helpers/constant';
import { WalletService } from '../wallet/wallet.service';
import { Op, Sequelize } from 'sequelize';
import { GroupModel } from 'src/entities';

@Injectable()
export class UserService {
  constructor(private walletService: WalletService) {}

  async readUserInfo(id: number) {
    return UserModel.findByPk(id, {
      include: [
        {
          model: StoreModel,
        },
      ],
    });
  }
  async readUserByUserName(username: string, data?: any) {
    let whereData: any = {
      username: username,
    };
    if (data && data.notIds && data.notIds.length > 0) {
      whereData.id = {
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
    const isGroup = params && params.isGroup ? Boolean(params.isGroup) : null;

    let whereData: any = {};
    if (roleIds && roleIds.length > 0) {
      whereData.roleId = roleIds;
    }
    if (userIds && userIds.length > 0) {
      whereData.id = userIds;
    }
    if (roleMemberCode && roleMemberCode.length > 0) {
      whereData.roleMemberCode = roleMemberCode;
    }
    if (filterString && filterString.length > 0) {
      whereData.name = {
        [Op.iLike]: `%${filterString}%`,
      };
    }
    if (isGroup === true) {
      whereData.groupId = {
        [Op.ne]: null,
      };
    }
    if (isGroup === false) {
      whereData.groupId = {
        [Op.eq]: null,
      };
    }
    const res = await UserModel.findAndCountAll({
      where: whereData,
      order: [['id', 'DESC']],
      include: [
        {
          model: GroupModel,
        },
      ],
      offset: offset,
      limit: limit,
    });
    if (!res) {
      return {
        rows: [],
        count: 0,
      };
    }
    const rows = res.rows;
    const count = res.count;
    const userResIds: Array<number> = rows.map((row) => {
      return row.id;
    });
    const wallets = await this.walletService.getBalance(userResIds);
    const walletMapping = _.keyBy(wallets, 'user_id');
    const userRes = rows.map((row) => {
      return {
        ...row.dataValues,
        balance: walletMapping[row.id] ? walletMapping[row.id].balance : 0,
      };
    });
    return {
      rows: userRes,
      count: count,
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

  async getBalanceByUser(userId: number) {
    const resBalance = await this.walletService.getBalance([userId]);
    if (!resBalance || resBalance.length <= 0) {
      return 0;
    }
    return resBalance[0].balance;
  }
  async overViewBalance(data: any) {
    return await this.walletService.overViewBalance(data);
  }
}

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { LoginResDto } from './dto/login-res.dto';
import { LoginInfoDto } from './dto/login-info.dto';
import { UserDeviceModel } from 'src/models/user-device.entity';
import { UserModel } from 'src/models/user.entity';
import { keysToCamel } from 'src/shared/helper/utils';
import { sequelize } from 'src/database/database.providers';
import { USER_STATUS } from '../user/user.status.enum';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await UserModel.findOne({
      where: {
        username,
        status: [USER_STATUS.PENDING, USER_STATUS.ACTIVATED],
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    delete user.passwordHash;
    return user;
  }

  async forgotPassword(username: string): Promise<any> {
    const user = await UserModel.findOne({
      where: {
        username,
      },
    });
    if (user) {
      const forgotHash = uuidv4();
      user.forgotHash = forgotHash;
      await user.save();
    } else {
      throw new Error('user not found');
    }
  }

  async updateForgotPassword(params): Promise<any> {
    const { username, forgotHash, password } = params;
    const forgotUser = await UserModel.findOne({
      where: {
        username,
        forgotHash,
      },
    });
    if (forgotUser) {
      forgotUser.passwordHash = await bcrypt.hash(password, 5);
      forgotUser.forgotHash = null;
      await forgotUser.save();
    } else {
      throw new Error('user not found');
    }
  }

  async login(user: LoginInfoDto): Promise<LoginResDto> {
    const { username, password, token } = user;
    const userInfo = await this.validateUser(username, password);
    try {
      if (token) {
        await UserDeviceModel.findOrCreate({
          where: { userId: userInfo.id },
          defaults: { token: token },
        });
      }
    } catch (error) {
      console.log('error when upsert token user', user);
    }
    console.log('userInfo', userInfo);
    const permission = await this._queryUserPermission(userInfo.id);
    // console.log("permission", permission);
    const payload = {
      userId: userInfo.id,
      username: userInfo.username,
      roleId: userInfo.roleId,
      roleMemberCode: userInfo.roleMemberCode,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      userInfo: userInfo,
      permission: permission,
    };
  }

  async logout(userId: number) {
    return UserDeviceModel.destroy({ where: { userId }, force: true });
  }

  async _queryUserPermission(userId) {
    const sqpReplacements = {
      userId: userId,
    };
    const queryStatement = `
            SELECT 
              features.id,
              features.code,
              features.text,
              features.path,
              features.icon,
              features.icon_app,
              features.parent_code,
              features."order",
              role_features.is_admin,
              role_features.view,
              role_features.edit
            FROM users 
            LEFT JOIN  roles ON users.role_id = roles.id AND roles.deleted_at IS NULL
            LEFT JOIN role_features ON roles.id = role_features.role_id AND role_features.deleted_at IS NULL
            LEFT JOIN features ON role_features.feature_code = features.code
            WHERE users.id = :userId
            ORDER BY features.parent_code DESC, features."order" ASC
            LIMIT 100
            OFFSET 0
        `;
    const permissionListRes = await sequelize.query(queryStatement, {
      type: 'SELECT',
      replacements: sqpReplacements,
    });
    const permissionList = [];
    permissionListRes.forEach((perm) => {
      const existingIndex = permissionList.findIndex((ele) => {
        return ele.code === perm['code'];
      });
      if (existingIndex >= 0) {
        if (perm['is_admin']) {
          permissionList[existingIndex].is_admin = true;
        }
      } else {
        permissionList.push(perm);
      }
    });
    return keysToCamel(permissionList);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Auth, AuthInfo } from 'src/shared/helper/auth.decorator';
import { validAdmin } from 'src/utils';
import { UserService } from './user.service';
import { BaseHttpException } from 'src/shared/helper/exception';
@Controller()
@ApiTags('Nhân viên')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ description: 'Lấy danh sách user' })
  async queryUsers(@Auth() auth: AuthInfo, @Query() query) {
    validAdmin(auth);
    const userResult = await this.userService.queryUser({
      page: Number(query.page) || 1,
      pageSize: Number(query.pageSize) || 100,
      roleIds: query.roleIds ? query.roleIds.split(',') : undefined,
      roleMemberCode: query.roleMemberCode,
      filterString: query.filterString,
      isGroup: query.isGroup,
    });
    return userResult;
  }

  @Post()
  @ApiOperation({ description: 'Tạo user' })
  async createUser(@Auth() auth: AuthInfo, @Body() body) {
    validAdmin(auth);
    const { userId } = auth;
    const username = body.username || body.phone;
    const oldUser = await this.userService.readUserByUserName(username);
    if (oldUser) {
      throw BaseHttpException.AccountAlreadyExists;
    }
    const newUserData = {
      name: body.name,
      phone: body.phone,
      username: username,
      address: body.address,
      email: body.email,
      avatar: body.avatar,
      createdById: userId,
      roleId: body.roleId,
      passwordHash: await bcrypt.hash(body.password, 5),
      roleMemberCode: body.roleMemberCode,
      bankName: body.bankName,
      bankAccount: body.bankAccount,
      priceDifference: body.priceDifference,
      group: body.group,
      warehouseId: body.warehouseId,
      groupId: body.groupId,
    };
    const newUser = await this.userService.createUser(newUserData);
    return newUser;
  }

  @Put(':id/status')
  @ApiOperation({ description: 'Cập nhật trạng thái tài khoản' })
  async updateUserStatus(@Auth() auth: AuthInfo, @Param() id, @Body() body) {
    validAdmin(auth);
    const userId = Number(+id);
    const updateUserData = {
      status: body.status,
    };
    const updateResult = await this.userService.updateUserInfo(
      userId,
      updateUserData,
    );
    return updateResult;
  }

  @Put(':id')
  @ApiOperation({ description: 'Cập nhật thông tin user' })
  async updateUser(@Auth() auth: AuthInfo, @Param() id, @Body() body) {
    validAdmin(auth);
    const userId = Number(+id);
    let username;
    if (body.username || body.phone) {
      username = body.username || body.phone;
      const oldUser = await this.userService.readUserByUserName(username, {
        notIds: [userId],
      });
      if (oldUser) {
        throw BaseHttpException.AccountAlreadyExists;
      }
    }
    const updateUserData = {
      username: username,
      name: body.name,
      phone: body.phone,
      address: body.address,
      email: body.email,
      avatar: body.avatar,
      roleId: body.roleId,
      passwordHash: body.password
        ? await bcrypt.hash(body.password, 5)
        : undefined,
      roleMemberCode: body.roleMemberCode,
      bankName: body.bankName,
      bankAccount: body.bankAccount,
      priceDifference: body.priceDifference,
      group: body.group,
      warehouseId: body.warehouseId,
      groupId: body.groupId,
    };
    return await this.userService.updateUserInfo(userId, updateUserData);
  }

  @Get('/:id')
  @ApiOperation({ description: 'Đọc thông tin chi tiết user' })
  async readUser(@Auth() auth: AuthInfo, @Param() id: number) {
    const userId = Number(+id);
    const readUser = await this.userService.readUserInfo(userId);
    return {
      readUser,
      perms: auth.perms,
    };
  }

  @Delete(':id')
  @ApiOperation({ description: 'Xoá user' })
  async deleteUser(@Auth() auth: AuthInfo, @Param() id: number) {
    validAdmin(auth);
    const userId = Number(+id);
    return this.userService.deleteUser(userId);
  }
}

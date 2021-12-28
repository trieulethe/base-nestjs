import { Controller, Body, Post, Get, Req, Session } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginInfoDto } from './dto/login-info.dto';
import { ForgotInfoDto } from './dto/forgot-info.dto';
import { UpdateForgotPasswordDto } from './dto/update-forgot-password.dto';
import { LogoutDto } from './dto/logout.dto';
import { NoAuth } from './metadata.decorator';
import { UserService } from '../user/user.service';
import { BaseHttpException } from 'src/shared/helper/exception';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @NoAuth()
  @Post('register')
  @ApiOperation({ description: 'Khách hàng đăng ký' })
  async register(@Body() body) {
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
      passwordHash: await bcrypt.hash(body.password, 5),
      warehouseId: body.warehouseId,
    };
    const newUser = await this.userService.createUser(newUserData);
    return newUser;
  }

  @NoAuth()
  @Post('login')
  async login(@Body() loginInfoDto: LoginInfoDto) {
    return this.authService.login(loginInfoDto);
  }

  @NoAuth()
  @Post('logout')
  async logout(@Body() logout: LogoutDto) {
    return this.authService.logout(logout.userId);
  }

  @NoAuth()
  @Post('forgot')
  async forgot(@Body() forgotInfoDto: ForgotInfoDto) {
    return this.authService.forgotPassword(forgotInfoDto.username);
  }

  @NoAuth()
  @Post('update-forgot-password')
  async updateForgotPassword(@Body() body: UpdateForgotPasswordDto) {
    return this.authService.updateForgotPassword({
      username: body.username,
      forgotHash: body.forgotHash,
      password: body.password,
    });
  }
}

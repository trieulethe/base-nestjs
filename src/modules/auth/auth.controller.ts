import { Controller, Body, Post, Get, Req, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginInfoDto } from './dto/login-info.dto';
import { ForgotInfoDto } from './dto/forgot-info.dto';
import { UpdateForgotPasswordDto } from './dto/update-forgot-password.dto';
// import { NoAuth } from "../../decorators/no-auth.decorator";
import { LogoutDto } from './dto/logout.dto';
import { NoAuth } from './metadata.decorator';
var svgCaptcha = require('svg-captcha');

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // @NoAuth()
  @Post('login')
  async login(@Body() loginInfoDto: LoginInfoDto) {
    console.log('hello');
    return this.authService.login(loginInfoDto);
  }

  // @NoAuth()
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

  @NoAuth()
  @Get('captcha')
  async getCaptcha(@Session() session) {
    const getCaptchaCount = Number(session.getCaptchaCount) || 0;
    session.getCaptchaCount = getCaptchaCount + 1;
    if (session.getCaptchaCount < 1000) {
      const captcha = svgCaptcha.create();
      session.lastCaptchaText = captcha.text;
      return captcha;
    } else {
      throw 'captcha count error';
    }
  }
}

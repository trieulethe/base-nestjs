import { createParamDecorator } from '@nestjs/common';
interface AuthInfo {
  userType: number;
  perms: any;
  userId: number;
  username: string;
  roleId: number;
  roleMemberCode: string;
}

const Auth = createParamDecorator(async (data: any, ctx: any) => {
  ctx.switchToHttp();
  const request = ctx.getRequest();
  const auth: AuthInfo = request.user;
  return auth;
});

export { Auth, AuthInfo };

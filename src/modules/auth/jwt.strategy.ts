import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import * as _ from 'lodash';
import { AUTH } from 'src/shared/helper/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    try {
      const perms = await this.authService._queryUserPermission(payload.userId);
      payload.perms = _.keyBy(perms, 'code');
    } catch (error) {
      console.log('error: ', error);
    }
    return payload;
  }
}

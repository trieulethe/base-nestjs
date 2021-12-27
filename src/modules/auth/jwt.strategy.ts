import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH } from '../../shared/helpers/config';
import { AuthService } from './auth.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import * as _ from 'lodash';
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

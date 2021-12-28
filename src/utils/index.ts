import { NotAcceptableException } from '@nestjs/common';
import * as _ from 'lodash';
import { AuthInfo } from 'src/shared/helper/auth.decorator';
import { ROLE_MAP } from 'src/shared/helper/constant';

export function validAdmin(roleMemberCode) {
  if (roleMemberCode !== ROLE_MAP.ADMIN && roleMemberCode !== ROLE_MAP.EMPLOYEE)
    throw new NotAcceptableException(
      'Cannot access resource, you are not admin !',
    );
}

export function isAdmin(auth: AuthInfo) {
  const { roleMemberCode } = auth;
  if (roleMemberCode !== ROLE_MAP.ADMIN && roleMemberCode !== ROLE_MAP.EMPLOYEE)
    return false;
  return true;
}

export function validOwner(userId, ownerId, roleMemberCode) {
  if (roleMemberCode === ROLE_MAP.CUSTOMER) {
    if (userId !== ownerId) {
      throw new NotAcceptableException(
        'cannot access resource, you are not owner',
      );
    }
  } else if (
    roleMemberCode !== ROLE_MAP.ADMIN &&
    roleMemberCode !== ROLE_MAP.EMPLOYEE
  ) {
    throw new NotAcceptableException(
      'cannot access resource, you are not admin',
    );
  }
}

export function validBalance(userBalance, amount: number) {
  if (!userBalance || !userBalance.length)
    throw new NotAcceptableException('Not exist balance!');
  const balance = userBalance[0].balance;
  if (balance < amount) throw new NotAcceptableException('Not enough balance!');
  return balance;
}

export function convertSnakeToCamelCase(object) {
  return _.mapKeys(object, (value, key) => _.camelCase(key));
}

export function splitAccessRole(auth: AuthInfo, query, field, param) {
  const { roleMemberCode, userId } = auth;
  if (roleMemberCode == ROLE_MAP.ADMIN || roleMemberCode == ROLE_MAP.EMPLOYEE) {
    if (param) {
      query[`${field}`] = param;
    }
  } else if (roleMemberCode == ROLE_MAP.CUSTOMER) {
    query[`${field}`] = userId;
  }
  return query;
}

export function splitAccessGetOne(auth: AuthInfo, id, field) {
  const { roleMemberCode, userId } = auth;
  let query = {};
  if (roleMemberCode == ROLE_MAP.CUSTOMER) {
    query['where'] = {
      id: +id,
    };
    query['where'][`${field}`] = userId;
  } else {
    query = { id: id };
  }
  return query;
}

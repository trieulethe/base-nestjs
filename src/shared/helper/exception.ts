import { HttpException } from '@nestjs/common';

enum HTTP {
  OK = 200,
  BAD_REQUEST = 400,
  UN_AUTHORIZED = 401,
  NOTFOUND = 404,
  PERMISSION_DENIED = 403,
  INTERNAL_SERVER = 500,
  BAD_GATEWAY = 502,
  GRPC_VALIDATE_ERR = 505,
  BURDEN = 408,
  CONFLICT = 409,
}

const BaseHttpException = {
  UnAuthorized: new HttpException(
    { message: 'Token không hợp lệ' },
    HTTP.UN_AUTHORIZED,
  ),
  PermissionDenied: new HttpException(
    { message: 'Không có quyền truy cập' },
    HTTP.PERMISSION_DENIED,
  ),
  CustomerNotfound: new HttpException(
    { message: 'Khách hàng không tồn tại trên hệ thống' },
    HTTP.NOTFOUND,
  ),
  Burden: new HttpException({ message: 'Không đủ số dư' }, HTTP.BURDEN),
  AccountAlreadyExists: new HttpException(
    { message: 'Tài khoản đã tồn tại' },
    HTTP.CONFLICT,
  ),
  HistoryNotfound: new HttpException(
    { message: 'Không tồn tại lịch sử này' },
    HTTP.NOTFOUND,
  ),
};
export { BaseHttpException };

import { Column, DataType } from 'sequelize-typescript';
import { BaseModel } from 'src/common/base.common.entity';

export class UserModel extends BaseModel {
  @Column({
    type: DataType.STRING,
    field: 'user_name',
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    field: 'password',
    allowNull: false,
  })
  password: string;
}
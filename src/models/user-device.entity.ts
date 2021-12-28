import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  AllowNull,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserModel } from './user.entity';

@Table({
  tableName: 'user_devices',
  indexes: [],
})
export class UserDeviceModel extends Model<UserDeviceModel> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column({
    field: 'token',
    type: DataType.STRING,
    unique: true,
  })
  token: string;

  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column({
    field: 'user_id',
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => UserModel, 'userId')
  user: UserModel;

  @CreatedAt
  @Column({
    field: 'created_at',
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
  })
  updatedAt: Date;

  @DeletedAt
  @Column({
    field: 'deleted_at',
  })
  deletedAt: Date;
}

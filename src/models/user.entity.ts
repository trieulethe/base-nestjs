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
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
@Table({
  tableName: 'users',
  indexes: [
    {
      fields: ['status'],
    },
  ],
})
export class UserModel extends Model<UserModel> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(true)
  @Column({
    field: 'user_name',
    type: DataType.TEXT,
  })
  username: string;

  @AllowNull(true)
  @Column({
    field: 'password_hash',
    type: DataType.TEXT,
  })
  passwordHash: string;

  @AllowNull(true)
  @Column({
    field: 'name',
    type: DataType.TEXT,
  })
  name: string;

  @AllowNull(false)
  @Column({
    field: 'phone',
    type: DataType.TEXT,
  })
  phone: string;

  @Column({
    field: 'email',
    type: DataType.TEXT,
  })
  email: string;

  @Column({
    field: 'address',
    type: DataType.TEXT,
  })
  address: string;

  @Column({
    field: 'avatar',
    type: DataType.STRING(2048),
  })
  avatar: string;

  @Column({
    field: 'forgot_hash',
    type: DataType.TEXT,
  })
  forgotHash: string;

  @AllowNull(false)
  @Column({
    field: 'status',
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  status: number;

  @AllowNull(false)
  @Column({
    field: 'role_id',
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  roleId: number;

  @AllowNull(true)
  @Column({
    field: 'role_member_code',
    type: DataType.STRING,
    defaultValue: 'CUSTOMER',
  })
  roleMemberCode: string;

  @AllowNull(true)
  @Column({
    field: 'bank_name',
    type: DataType.STRING,
  })
  bankName: string;

  @AllowNull(true)
  @Column({
    field: 'bank_account',
    type: DataType.STRING,
  })
  bankAccount: string;

  @AllowNull(true)
  @Column({
    field: 'price_difference',
    type: DataType.FLOAT,
  })
  priceDifference: number;

  @ForeignKey(() => UserModel)
  @Column({
    field: 'created_by_id',
    type: DataType.INTEGER,
  })
  createdById: number;

  @BelongsTo(() => UserModel)
  createdBy: UserModel;

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

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      name: this.name,
      phone: this.phone,
      email: this.email,
      address: this.address,
      avatar: this.avatar,
      forgotHash: this.forgotHash,
      status: this.status,
      roleId: this.roleId,
      roleMemberCode: this.roleMemberCode,
      bankName: this.bankName,
      bankAccount: this.bankAccount,
      priceDifference: this.priceDifference,
      createdById: this.createdById,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}

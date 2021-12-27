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
  Default,
  Comment,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { UserModel } from './user.entity';

@Table({
  tableName: 'roles',
  indexes: [],
})
export class RoleModel extends Model<RoleModel> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column({
    field: 'code',
    type: DataType.TEXT,
  })
  code: string;

  @AllowNull(false)
  @Column({
    field: 'name',
    type: DataType.TEXT,
  })
  name: string;

  @AllowNull(false)
  @Column({
    field: 'status',
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  status: number;

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
}

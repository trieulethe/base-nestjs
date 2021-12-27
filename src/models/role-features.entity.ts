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
} from 'sequelize-typescript';
import { RoleModel } from './role.entity';

@Table({
  tableName: 'role_features',
  indexes: [],
})
export class RoleFeatureModel extends Model<RoleFeatureModel> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    field: 'feature_code',
    type: DataType.TEXT,
  })
  featureCode: string;

  @Column({
    field: 'is_admin',
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isAdmin: boolean;

  @Column({
    field: 'edit',
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  edit: boolean;

  @Column({
    field: 'view',
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  view: boolean;

  @ForeignKey(() => RoleModel)
  @Column({
    field: 'role_id',
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  roleId: number;

  @Column({
    field: 'created_by_id',
    type: DataType.INTEGER,
  })
  createdById: number;

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

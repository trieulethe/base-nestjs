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
} from 'sequelize-typescript';

@Table({
  tableName: 'features',
  indexes: [],
})
export class FeatureModel extends Model<FeatureModel> {
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

  @Column({
    field: 'text',
    type: DataType.TEXT,
  })
  text: number;

  @Column({
    field: 'path',
    type: DataType.TEXT,
  })
  path: number;

  @Column({
    field: 'icon',
    type: DataType.TEXT,
  })
  icon: string;

  @Column({
    field: 'icon_app',
    type: DataType.TEXT,
  })
  iconApp: string;

  @Column({
    field: 'parent_code',
    type: DataType.TEXT,
  })
  parentCode: number;

  @Column({
    field: 'order',
    type: DataType.INTEGER,
  })
  order: number;

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

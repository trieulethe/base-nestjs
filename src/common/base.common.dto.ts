import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
} from 'class-validator';

export enum SortDto {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class FindAllControllerDto {
  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  page: number;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  pageSize: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  userId: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sortByField: string;

  @ApiPropertyOptional()
  @IsEnum(SortDto)
  @IsOptional()
  sort: SortDto;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  fromDate: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  toDate: string;
}

export class FindAllServiceDto extends PartialType(FindAllControllerDto) {
  @IsString({ each: true })
  @IsOptional()
  relations?: string[];

  @IsOptional()
  where?: any;

  @IsBoolean()
  @IsOptional()
  distinct?: boolean;
}

export class FindOne {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiPropertyOptional()
  @IsString({ each: true })
  @IsOptional()
  relations?: string[];

  @IsOptional()
  where?: any;
}

export class PagingDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  page: number;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  pageSize: number;
}

export class ReportDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumberString()
  page: number;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsNotEmpty()
  pageSize: number;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  from: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  to: string;
}

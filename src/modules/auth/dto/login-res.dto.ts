import { IsString, IsObject, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResDto {
  @IsString()
  @ApiProperty({
    description: 'accessToken for JWT authorization',
  })
  readonly accessToken: string;

  @IsObject()
  @ApiProperty({
    description: 'authorized user info',
  })
  readonly userInfo: object;

  @IsArray()
  @ApiProperty({
    description: 'permission list',
  })
  readonly permission: any;
}

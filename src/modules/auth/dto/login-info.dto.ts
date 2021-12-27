import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginInfoDto {
  @IsString()
  @ApiProperty({
    description: 'email or username for login information',
    example: 'long',
  })
  readonly username: string;

  @IsString()
  @ApiProperty({
    description: 'password for login information',
    example: 'long',
  })
  readonly password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'token expo',
    example: 'long',
  })
  readonly token: string;
}

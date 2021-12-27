import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateForgotPasswordDto {
  @IsString()
  @ApiProperty({
    description: 'password',
    example: 'long',
  })
  readonly username: string;

  @IsString()
  @ApiProperty({
    description: 'password',
    example: 'long',
  })
  readonly password: string;

  @IsString()
  @ApiProperty({
    description: 'forgotHash',
    example: 'long',
  })
  readonly forgotHash: string;
}

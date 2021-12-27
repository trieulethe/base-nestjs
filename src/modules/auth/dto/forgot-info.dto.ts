import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotInfoDto {
  @IsString()
  @ApiProperty({
    description: 'email or username for login information',
    example: 'long',
  })
  readonly username: string;
}

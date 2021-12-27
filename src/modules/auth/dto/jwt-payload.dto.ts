import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JwtPayloadDto {
  @IsString()
  @ApiProperty({
    description: 'username for login information',
  })
  readonly username: string;

  @IsString()
  @ApiProperty({
    description: 'user fullname',
  })
  readonly name: string;
}

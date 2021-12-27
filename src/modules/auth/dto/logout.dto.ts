import { IsInt, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {
  @IsInt()
  @ApiProperty({
    description: 'userId',
  })
  readonly userId: number;
}

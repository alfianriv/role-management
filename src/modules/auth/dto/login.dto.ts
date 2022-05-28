import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email',
    example: 'john.doe@gmail.com',
  })
  @IsEmail()
  @IsString()
  email: string;
}

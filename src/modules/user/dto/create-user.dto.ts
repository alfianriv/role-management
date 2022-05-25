import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The user name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'The user email',
    example: 'john.doe@gmail.com',
  })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'The roleId',
    example: '1',
  })
  @IsNumber()
  @IsInt()
  @IsOptional()
  readonly roleId?: number;
}

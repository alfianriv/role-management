import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePermissionGroupDto {
  @ApiProperty({
    description: 'Permission group name',
    example: 'roles:all',
  })
  @IsString()
  name: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePermissionGroupDto {
  @ApiProperty({
    description: 'Name of permission group',
    example: 'Roles:all',
  })
  @IsString()
  name: string;
}

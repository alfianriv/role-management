import { ApiProperty } from '@nestjs/swagger';
import { IsNotIn, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Role name',
    example: 'superadmin',
  })
  @IsString()
  @IsNotIn(['superadmin'])
  name: string;
}

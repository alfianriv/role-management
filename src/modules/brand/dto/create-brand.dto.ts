import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({
    description: 'Brand name',
    example: 'Gucci',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Brand image',
  })
  @IsString()
  image: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateVariantDto {
  @ApiProperty({
    description: 'Variant name',
    example: 'CHANCE EAU TENDRE Eau de Toilette',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Variant price',
    example: 1200000,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Variant size',
    example: 1.3,
  })
  @IsNumber()
  size: number;

  @ApiProperty({
    description: 'Variant unit size',
    example: 'Oz',
  })
  @IsString()
  sizeUnit: string;

  @ApiProperty({
    description: 'Variant image',
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Perfume Id',
    example: 1,
  })
  @IsNumber()
  perfumeId;
}

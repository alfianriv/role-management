import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  ArrayMinSize,
  IsNumber,
  IsInt,
} from 'class-validator';

export class CreatePerfumeDto {
  @ApiProperty({
    description: 'Name of perfume',
    example: 'CHANCE EAU TENDRE Eau de Toilette',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of perfume',
  })
  @IsArray()
  @ArrayMinSize(1)
  description: any;

  @ApiProperty({
    description: 'Image of perfume',
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Ingredients of perfume',
  })
  @IsString()
  ingredients: string;

  @ApiProperty({
    description: 'How to use perfume',
  })
  @IsString()
  howtToUse: string;

  @ApiProperty({
    description: 'Brand of perfume',
  })
  @IsNumber()
  @IsInt()
  brandId: number;
}

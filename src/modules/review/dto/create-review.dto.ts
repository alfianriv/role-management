import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'The review',
    example: 'The best perfume ever',
  })
  @IsString()
  review: string;

  @ApiProperty({
    description: 'The variant id',
    example: 1,
  })
  @IsNumber()
  @IsInt()
  variantId: number;

  @ApiProperty({
    description: 'The user id',
    example: 1,
  })
  @Min(1)
  @Max(5)
  @IsNumber()
  @IsInt()
  rating: number;
}

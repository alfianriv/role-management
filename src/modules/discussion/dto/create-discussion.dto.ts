import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDiscussionDto {
  @ApiProperty({
    description: 'The discussion',
    example: 'The discussion',
  })
  @IsString()
  discussion: string;

  @ApiProperty({
    description: 'The replied discussion',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  discussionId?: number;

  @ApiProperty({
    description: 'The perfume id',
    example: 1,
  })
  @IsNumber()
  perfumeId: number;
}

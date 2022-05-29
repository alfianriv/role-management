import { IsInt, IsNumber, Min } from "class-validator";

export class PaginationDto {
    @IsNumber()
    @IsInt()
    @Min(1)
    page: number = 1;

    @IsNumber()
    @IsInt()
    @Min(1)
    perPage: number = 10;
}
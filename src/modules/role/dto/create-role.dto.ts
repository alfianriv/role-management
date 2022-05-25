import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({
        description: "Role name",
        example: "superadmin",
    })
    @IsString()
    name: string;
}

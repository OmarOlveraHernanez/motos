import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { PersonalDto } from "./personal.dto";

export class CreateDataUserDto {
    @ApiProperty()
    @ValidateNested()
    @Type(() => PersonalDto)
    personal: PersonalDto;

    @ApiProperty()
    @IsString()
    user: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { AlmacenDto } from "./alamacen.dto";

export class CreateAlmacenDto {

    @ApiProperty()
    @ValidateNested()
    @Type(() => AlmacenDto)
    resource: AlmacenDto;


    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    users?: string[];
}

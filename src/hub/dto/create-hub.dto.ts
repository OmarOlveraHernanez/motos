import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { HubDto } from "./hub.dto";
import { ConfigDto } from "./config.dto";


export class CreateHubDto {

    @ApiProperty()
    @ValidateNested()
    @IsNotEmpty()
    @Type(() => HubDto)
    resource: HubDto;


    @ApiProperty()
    @ValidateNested()
    @IsNotEmpty()
    @Type(() => ConfigDto)
    config: ConfigDto;


    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    users?: string[];

}

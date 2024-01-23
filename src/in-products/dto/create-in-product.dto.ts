import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { InProductDto } from "./in-product.dto";

export class CreateInProductDto {

    @ApiProperty()
    @ValidateNested()
    @Type(() => InProductDto)
    resource: InProductDto;


    @ApiProperty()
    @IsString()
    product: string;
}

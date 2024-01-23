import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { OutProductDto } from "./out-product.dto";

export class CreateOutProductDto {


    @ApiProperty()
    @ValidateNested()
    @Type(() => OutProductDto)
    resource: OutProductDto;


    @ApiProperty()
    @IsString()
    product: string;
}

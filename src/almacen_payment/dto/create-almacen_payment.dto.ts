import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { AlmacenPaymentDto } from "./almacen-payment.dto";

export class CreateAlmacenPaymentDto {

    @ApiProperty()
    @ValidateNested()
    @Type(() => AlmacenPaymentDto)
    resource: AlmacenPaymentDto;
    

    @ApiProperty()
    @IsString()
    almacen: string;
}

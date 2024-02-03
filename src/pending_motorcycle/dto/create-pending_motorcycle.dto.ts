import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { PendingMotorcycleDto } from "./pending_motorcycle.dto";

export class CreatePendingMotorcycleDto {


    @ApiProperty()
    @ValidateNested()
    @IsOptional()
    @Type(() => PendingMotorcycleDto)
    resource: PendingMotorcycleDto;
}

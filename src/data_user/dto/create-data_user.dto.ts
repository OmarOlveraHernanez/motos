import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { PersonalDto } from "./personal.dto";
import { MedicalDto } from "./medical.dto";
import { ContactDto } from "./contact.dto";
import { OtherDto } from "./other.dto";

export class CreateDataUserDto {
    @ApiProperty()
    @ValidateNested()
    @IsOptional()
    @Type(() => PersonalDto)
    personal: PersonalDto;

    @ApiProperty()
    @ValidateNested()
    @IsOptional()
    @Type(() => MedicalDto)
    medical: MedicalDto;


    @ApiProperty({
        type: [ContactDto],
      })
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => ContactDto)
    @IsOptional()
    contacts: ContactDto[];


    @ApiProperty({
        type: [OtherDto],
      })
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => OtherDto)
    @IsOptional()
    others: OtherDto[];

    
}

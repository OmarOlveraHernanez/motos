import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { PersonalDto } from "./personal.dto";
import { MedicalDto } from "./medical.dto";
import { ContactDto } from "./contact.dto";
import { OtherDto } from "./other.dto";

export class CreateDataUserDto {
    @ApiProperty()
    @ValidateNested()
    @Type(() => PersonalDto)
    personal: PersonalDto;

    @ApiProperty()
    @ValidateNested()
    @Type(() => MedicalDto)
    medical: MedicalDto;


    @ApiProperty({
        type: [ContactDto],
      })
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => ContactDto)
    contacts: ContactDto[];


    @ApiProperty({
        type: [OtherDto],
      })
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => OtherDto)
    others: OtherDto[];

    
    

    @ApiProperty()
    @IsString()
    user: string;
}

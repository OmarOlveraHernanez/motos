import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
         IsPositive, IsString, MaxLength, MinLength 
} from 'class-validator';


export class PersonalDto {
    

    @ApiProperty()
    @IsString()
    @IsOptional()
    photography?: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(150)
    actual_direction?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(50)
    phone?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(50)
    email?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(50)
    civil_status?: string;

    
    nationalities?: string[];
   
    RFC?: string;

    CURP?: string;



}
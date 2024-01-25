import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsBoolean, IsEmail, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, 
         IsPhoneNumber, 
         IsPositive, IsString, Matches, MaxLength, MinLength 
} from 'class-validator';


export class OtherDto {
    
    @IsNotEmpty()
    @ApiProperty()
    @IsBoolean()
    visible: boolean;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(100)
    type?: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(150)
    description?: string;



}
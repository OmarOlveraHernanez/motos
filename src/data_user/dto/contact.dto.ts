import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsBoolean, IsEmail, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, 
         IsPhoneNumber, 
         IsPositive, IsString, Matches, MaxLength, MinLength 
} from 'class-validator';


export class ContactDto {
    
    @IsNotEmpty()
    @ApiProperty()
    @IsBoolean()
    visible: boolean;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(100)
    relationship?: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(150)
    name_relationship?: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsPhoneNumber(null, { message: 'Please enter a valid phone number' })
    phone_relationship?: string;

   

}
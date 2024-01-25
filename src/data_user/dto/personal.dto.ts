import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsBoolean, IsEmail, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, 
         IsPhoneNumber, 
         IsPositive, IsString, Matches, MaxLength, MinLength 
} from 'class-validator';


export class PersonalDto {
    
    @IsNotEmpty()
    @ApiProperty()
    @IsBoolean()
    visible: boolean;

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
    @IsPhoneNumber(null, { message: 'Please enter a valid phone number' })
    phone?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsEmail({}, { message: 'Please enter a valid email address' })
    email?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Matches(new RegExp('^(soltero|casado)$', 'i'), { message: 'Invalid civil status. Must be casado y soltero' })
    civil_status?: string;

    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @MinLength(5)
    @MaxLength(50)
    nationalities?: string[];
   

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Matches(/^[A-Z]{4}\d{6}[A-Z0-9]{3}$/, { message: 'Please enter a valid RFC' })
    RFC?: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    @Matches(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/, { message: 'Please enter a valid CURP' })
    CURP?: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    @Matches(/^\d{18}$/, { message: 'Please enter a valid INE number' })
    INE?: string;






}
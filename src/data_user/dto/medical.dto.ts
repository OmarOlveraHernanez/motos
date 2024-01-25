import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsBoolean, IsEmail, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, 
         IsPhoneNumber, 
         IsPositive, IsString, Matches, MaxLength, MinLength 
} from 'class-validator';


export class MedicalDto {
    

    @IsNotEmpty()
    @ApiProperty()
    @IsBoolean()
    @MinLength(5)
    @MaxLength(150)
    visible: boolean;

    @ApiProperty()
    @IsString()
    @IsOptional()
    name_doctor?: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsPhoneNumber(null, { message: 'Please enter a valid phone number' })
    phone_doctor?: string;


    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @MinLength(5)
    @MaxLength(100)
    allergies?: string[];

    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @MinLength(5)
    @MaxLength(100)
    medicines?: string[];


    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @MinLength(5)
    @MaxLength(100)
    diseases?: string[];


    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @MinLength(5)
    @MaxLength(100)
    surgeries?: string[];


    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @MinLength(5)
    @MaxLength(100)
    health_problems?: string[];
    

    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @MinLength(5)
    @MaxLength(100)
    background_fam?: string[];


    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @MinLength(5)
    @MaxLength(100)
    vaccines?: string[];
   




}
import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsBoolean, IsEmail, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, 
         IsPhoneNumber, 
         IsPositive, IsString, Matches, MaxLength, MinLength 
} from 'class-validator';


export class MedicalDto {
    

    @IsNotEmpty()
    @ApiProperty()
    @IsBoolean()
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
    @MinLength(2,{ each: true })
    @MaxLength(220,{ each: true })
    allergies?: string[];

    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @MinLength(2,{ each: true })
    @MaxLength(220,{ each: true })
    medicines?: string[];


    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @MinLength(2,{ each: true })
    @MaxLength(220,{ each: true })
    diseases?: string[];


    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @MinLength(2,{ each: true })
    @MaxLength(220,{ each: true })
    surgeries?: string[];


    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @MinLength(2,{ each: true })
    @MaxLength(220,{ each: true })
    health_problems?: string[];
    

    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @MinLength(2,{ each: true })
    @MaxLength(220,{ each: true })
    background_fam?: string[];


    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @MinLength(2,{ each: true })
    @MaxLength(220,{ each: true })
    vaccines?: string[];
   




}
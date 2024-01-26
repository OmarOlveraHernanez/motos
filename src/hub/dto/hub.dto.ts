import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsBoolean, IsEmail, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, 
         IsPhoneNumber, 
         IsPositive, IsString, MaxLength, MinLength 
} from 'class-validator';


export class HubDto {
    


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(200)
    name: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(200)
    description?: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(200)
    location?: string;
    

    count_members: number;

    



}
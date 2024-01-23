import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
         IsPositive, IsString, MinLength 
} from 'class-validator';


export class UserDto {

    @ApiProperty()
    @IsString()
    @MinLength(2)
    fullName: string;

    @ApiProperty()
    @IsString()
    @MinLength(3)
    direction: string;
    
    @ApiProperty()
    @IsString()
    phone?: string;

}
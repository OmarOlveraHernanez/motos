import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
         IsPositive, IsString, MinLength 
} from 'class-validator';


export class ProductDto {

    @ApiProperty()
    @IsString()
    @MinLength(2)
    code: string;

    @ApiProperty()
    @IsString()
    @MinLength(3)
    name: string;
    
    @ApiProperty()
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    serie?: string;






}
import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
         IsPositive, IsString, MinLength 
} from 'class-validator';


export class AlmacenDto {

    @ApiProperty()
    @IsString()
    @MinLength(5)
    name: string;

    @ApiProperty()
    @IsString()
    @MinLength(5)
    description: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    direccion?: string;



}
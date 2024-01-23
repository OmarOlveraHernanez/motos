import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
         IsPositive, IsString, MinLength 
} from 'class-validator';


export class AlmacenPaymentDto {

    @ApiProperty()
    @IsString()
    @MinLength(5)
    date: string;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    weight: number;


    @ApiProperty()
    @IsInt()
    @IsPositive()
    quantity_packaging: number;


    @ApiProperty()
    @IsInt()
    @IsPositive()
    quantity_shipments: number;


    @ApiProperty()
    @IsInt()
    @IsPositive()
    amount: number;


    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    shipments?: string[];








}
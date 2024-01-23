import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
         IsPositive, IsString, MinLength 
} from 'class-validator';


export class OutProductDto {
   
    name: string;

    id_product: string;

    code: string;


    @ApiProperty()
    @IsInt()
    amount: number;

    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    series?: string[];


    @ApiProperty()
    @IsString()
    @IsOptional()
    addressee?: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    parcel?: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    address?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    guide?: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    dimensions?: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    weight?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    packaging?: string;

    


}
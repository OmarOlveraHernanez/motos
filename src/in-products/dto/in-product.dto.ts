import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
         IsPositive, IsString, MinLength 
} from 'class-validator';


export class InProductDto {
    
    
    id_product: string;

    @ApiProperty()
    @IsInt()
    amount: number;

    
    name: string;


    
    code: string;

    
    serie?: string;
   
    


}
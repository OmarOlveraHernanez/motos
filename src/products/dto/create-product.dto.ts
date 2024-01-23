import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
         IsPositive, IsString, MinLength, ValidateNested 
} from 'class-validator';
import { ProductDto } from './product.dto';


export class CreateProductDto {

    @ApiProperty()
    @ValidateNested()
    @Type(() => ProductDto)
    resource: ProductDto;

    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];


    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    almacenes?: string[];


}

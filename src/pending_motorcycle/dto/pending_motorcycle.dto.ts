import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsEmail,  IsOptional, 
          IsPhoneNumber, 
          IsString, Matches, MinLength, ValidateIf, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface 
} from 'class-validator';
import { AtLeastOne } from './atleastone.dto';


export class PendingMotorcycleDto {
    


    status: string;
   
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsPhoneNumber(null, { message: 'Please enter a valid phone number' })
    phone?: string;


    @ApiProperty()
    @IsString()
    @MinLength(1)
    fullName: string;


    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @Matches(new RegExp('^(admin|user|super)$', 'i'), { each: true, message: 'Invalid role. Must be admin, user, or super-user' })
    roles?: string[];

    @ApiProperty()
    @IsString()
    @IsOptional()
    @ValidateIf(o => !o.RFC)  // Use @ValidateIf to conditionally apply the AtLeastOne constraint
    @AtLeastOne()
    @Matches(/^[A-Z]{4}\d{6}[A-Z0-9]{3}$/, { message: 'Please enter a valid RFC' })
    RFC?: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    @ValidateIf(o => !o.CURP)  // Use @ValidateIf to conditionally apply the AtLeastOne constraint
    @AtLeastOne()
    @Matches(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/, { message: 'Please enter a valid CURP' })
    CURP?: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    @ValidateIf(o => !o.INE)  // Use @ValidateIf to conditionally apply the AtLeastOne constraint
    @AtLeastOne()
    @Matches(/^\d{18}$/, { message: 'Please enter a valid INE number' })
    INE?: string;


   
}
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { UserDto } from './user.dto';


export class CreateUserDto {


    @ApiProperty()
    @ValidateNested()
    @Type(() => UserDto)
    resource: UserDto;


    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;


    @ApiProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    fullName: string;


    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    @Matches(new RegExp('^(admin|user|super-user)$', 'i'), { each: true, message: 'Invalid role. Must be admin, user, or super-user' })
    roles?: string[];


    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    almacenes?: string[];

}
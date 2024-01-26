import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DataUserService } from './data_user.service';
import { CreateDataUserDto } from './dto/create-data_user.dto';
import { UpdateDataUserDto } from './dto/update-data_user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@ApiTags('data_user')
@Controller('data-user')
export class DataUserController {
  constructor(private readonly dataUserService: DataUserService) {}

  @Post()
  @Auth()
  @ApiBearerAuth()
  create(@Body() createDataUserDto: CreateDataUserDto,
         @GetUser() user: User,) {
    return this.dataUserService.create(createDataUserDto,user);
  }

  @Auth()
  @ApiBearerAuth()
  @Get()
  findOne(@GetUser() user: User) {
    return this.dataUserService.findOne(user);
  }

  @Auth()
  @ApiBearerAuth()
  @Patch()
  update(@GetUser() user: User, @Body() updateDataUserDto: UpdateDataUserDto) {
    return this.dataUserService.update(user, updateDataUserDto);
  }

}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DataUserService } from './data_user.service';
import { CreateDataUserDto } from './dto/create-data_user.dto';
import { UpdateDataUserDto } from './dto/update-data_user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('data_user')
@Controller('data-user')
export class DataUserController {
  constructor(private readonly dataUserService: DataUserService) {}

  @Post()
  create(@Body() createDataUserDto: CreateDataUserDto) {
    return this.dataUserService.create(createDataUserDto);
  }

  @Get()
  findAll() {
    return this.dataUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataUserDto: UpdateDataUserDto) {
    return this.dataUserService.update(+id, updateDataUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataUserService.remove(+id);
  }
}

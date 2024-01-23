import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OutProductsService } from './out-products.service';
import { CreateOutProductDto } from './dto/create-out-product.dto';
import { UpdateOutProductDto } from './dto/update-out-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


@ApiTags('OutProducts')
@Controller('out-products')
export class OutProductsController {
  constructor(private readonly outProductsService: OutProductsService) {}

  @Post()
  create(@Body() createOutProductDto: CreateOutProductDto) {
    return this.outProductsService.create(createOutProductDto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.outProductsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('id') id: string) {
    return this.outProductsService.findOne(id);
  }
  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOutProductDto: UpdateOutProductDto) {
    return this.outProductsService.update(+id, updateOutProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outProductsService.remove(+id);
  }*/
}

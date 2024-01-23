import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { InProductsService } from './in-products.service';
import { CreateInProductDto } from './dto/create-in-product.dto';
import { UpdateInProductDto } from './dto/update-in-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('InProducts')
@Controller('in-products')
export class InProductsController {
  constructor(private readonly inProductsService: InProductsService) {}

  @Post()
  create(@Body() createInProductDto: CreateInProductDto) {
    return this.inProductsService.create(createInProductDto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.inProductsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param( 'term' ) term: string) {
    return this.inProductsService.findOne(term);
  }

  /*
  @Patch(':id')
  update( 
    @Param('id', ParseUUIDPipe ) id: string, 
     @Body() updateInProductDto: UpdateInProductDto) {
    return this.inProductsService.update(id, updateInProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inProductsService.remove(+id);
  }*/
}

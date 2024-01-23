import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { AlmacenPaymentService } from './almacen_payment.service';
import { CreateAlmacenPaymentDto } from './dto/create-almacen_payment.dto';
import { UpdateAlmacenPaymentDto } from './dto/update-almacen_payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


@ApiTags('Almacenes Payments')
@Controller('almacen-payment')
export class AlmacenPaymentController {
  constructor(private readonly almacenPaymentService: AlmacenPaymentService) {}

  @Post()
  create(
    @Body() createAlmacenPaymentDto: CreateAlmacenPaymentDto
    ) {
    return this.almacenPaymentService.create(createAlmacenPaymentDto);
  }

  @Get()
  findAll(
    @Query() paginationDto:PaginationDto
  ) {
    return this.almacenPaymentService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.almacenPaymentService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateAlmacenPaymentDto: UpdateAlmacenPaymentDto
    ) {
    return this.almacenPaymentService.update(id, updateAlmacenPaymentDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe ) id: string,) {
    return this.almacenPaymentService.remove(id);
  }
}

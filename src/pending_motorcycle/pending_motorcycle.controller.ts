import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PendingMotorcycleService } from './pending_motorcycle.service';
import { CreatePendingMotorcycleDto } from './dto/create-pending_motorcycle.dto';
import { UpdatePendingMotorcycleDto } from './dto/update-pending_motorcycle.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('pending-motorcycle')
@Controller('pending-motorcycle')
export class PendingMotorcycleController {
  constructor(private readonly pendingMotorcycleService: PendingMotorcycleService) {}

  @Post()
  create(@Body() createPendingMotorcycleDto: CreatePendingMotorcycleDto) {
    return this.pendingMotorcycleService.create(createPendingMotorcycleDto);
  }

  @Get()
  findAll() {
    return this.pendingMotorcycleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pendingMotorcycleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePendingMotorcycleDto: UpdatePendingMotorcycleDto) {
    return this.pendingMotorcycleService.update(+id, updatePendingMotorcycleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pendingMotorcycleService.remove(+id);
  }
}

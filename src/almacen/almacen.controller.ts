import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { AlmacenService } from './almacen.service';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { AlmacenDto } from './dto/alamacen.dto';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
@ApiTags('Almacenes')
@Controller('almacen')
export class AlmacenController {
  constructor(private readonly almacenService: AlmacenService) {}
  
  @Post()
  //@Auth()
  //@ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Product was created', type: AlmacenDto  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  create(
    @Body() createAlmacenDto: CreateAlmacenDto,
    //@GetUser() user: User
    ) {
    return this.almacenService.create(createAlmacenDto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.almacenService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.almacenService.findOnePlain(term);
  }

  @Patch(':id')
  update(
         @Param('id', ParseUUIDPipe ) id: string, 
         @Body() updateAlmacenDto: UpdateAlmacenDto,
        // @GetUser() user: User,
         ) {
    return this.almacenService.update(id, updateAlmacenDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe ) id: string,) {
    return this.almacenService.remove(id);
  }
}

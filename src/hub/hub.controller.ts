import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HubService } from './hub.service';
import { CreateHubDto } from './dto/create-hub.dto';
import { UpdateHubDto } from './dto/update-hub.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('hub')
@Controller('hub')
export class HubController {
  constructor(private readonly hubService: HubService) {}

  @Post()
  @Auth( ValidRoles.superUser)
  @ApiBearerAuth()
  create(@Body() createHubDto: CreateHubDto) {
    return this.hubService.create(createHubDto);
  }

  @Get()
  @Auth( ValidRoles.superUser)
  @ApiBearerAuth()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.hubService.findAll(paginationDto);
  }

  @Get(':term')
  @Auth( ValidRoles.superUser)
  @ApiBearerAuth()
  findOne(@Param('term') term: string) {
    return this.hubService.findOne(term);
  }

  @Patch(':id')
  @Auth( ValidRoles.superUser)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateHubDto: UpdateHubDto) {
    return this.hubService.update(id, updateHubDto);
  }

  @Delete(':id')
  @Auth( ValidRoles.superUser)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.hubService.remove(id);
  }
}

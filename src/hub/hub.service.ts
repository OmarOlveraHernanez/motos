import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHubDto } from './dto/create-hub.dto';
import { UpdateHubDto } from './dto/update-hub.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hub } from './entities/hub.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class HubService {


  constructor(
    @InjectRepository(Hub)
    private readonly hubRepository: Repository<Hub>,
   
  ) {}


 async create(createHubDto: CreateHubDto) {
    const Hub = await this.hubRepository
    .createQueryBuilder('hub')
    .where("UPPER(hub.resource->>'name') = UPPER(:name)", {name: createHubDto.resource.name })
    .getOne();
    if(Hub) throw new NotFoundException(`Hub exist with name: ${ createHubDto.resource.name }`);

    let dataHub = await this.hubRepository.create({...createHubDto});
    dataHub = await this.hubRepository.save(dataHub);
    return dataHub;
  }

  async findAll(paginationDto:PaginationDto) {

    const { limit = 10, offset = 0 , term} = paginationDto;
    let hubs = [];

    if(!term)
    hubs = await this.hubRepository.find({
      take: limit,
      skip: offset
    });
    else{
      const queryBuilder = this.hubRepository.createQueryBuilder('hub'); 
      hubs = await queryBuilder
      .where("UPPER(hub.resource->>'name') LIKE UPPER(:term) OR UPPER(hub.resource->>'description') LIKE UPPER(:term) ", {
        term: `%${term}%`,
      })
      .getMany();;
    }
    


    

    return hubs.map( ( hub ) => ({
      ...hub
    }))
  }

  async findOne(term: string) {
    let hub: Hub;

    if ( isUUID(term) ) {
      //product = await this.productRepository.findOneBy({ id: term });
      hub = await this.hubRepository
      .createQueryBuilder('u')
      .where('u.id = :id', { id: term })
      .getOne();;
    } else {
      const queryBuilder = this.hubRepository.createQueryBuilder('u'); 
      hub = await queryBuilder
      .where("UPPER(u.resource->>'name') LIKE UPPER(:term) OR UPPER(u.resource->>'description') LIKE UPPER(:term)", {
        term: `%${term}%`,
      })
        .getOne();
    }


    if ( !hub ) 
      throw new NotFoundException(`Hub with ${ term } not found`);

    return hub;
  }

  async update(id: string, updateHubDto: UpdateHubDto) {
    const hub = await this.hubRepository.preload({ id, ...updateHubDto });
    if(!hub) throw new NotFoundException(`Hub with ${ id } not found`);
    await this.hubRepository.save(hub);
    return hub;
  }

  async remove(id: string) {
    const hub = await this.hubRepository.findOne({ where: { id: id } });
    if(!hub) throw new NotFoundException(`Hub with ${ id } not found`);
    hub.resource.isActive = ! hub.resource.isActive;
    await this.hubRepository.save(hub);
    return hub;
  }
}

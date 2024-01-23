import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateOutProductDto } from './dto/create-out-product.dto';
import { UpdateOutProductDto } from './dto/update-out-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { OutProduct } from './entities/out-product.entity';
import { Product } from 'src/products/entities';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';



@Injectable()
export class OutProductsService {

  private readonly logger = new Logger('OutProductsService');
  constructor(

    @InjectRepository(OutProduct)
    private readonly outProductRepository: Repository<OutProduct>,
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>, 
  
    private readonly dataSource: DataSource,
  
  ) {}

  async create(createOutProductDto: CreateOutProductDto) {
    try {
      const {  product  , ...outproductDetails } = createOutProductDto;
      let product_entity =  await this.ProductRepository.findOne({ where: { id: product } });
      if ( !product_entity ) throw new NotFoundException(`Product with id: ${ product } not found`);
      if(product_entity.resource.stock < outproductDetails.resource.amount)
         throw new BadRequestException("error amount");
      product_entity.resource.stock -= outproductDetails.resource.amount;
      await this.ProductRepository.save(product_entity);
      outproductDetails.resource.name = product_entity.resource.name;
      outproductDetails.resource.id_product = product_entity.id;
      outproductDetails.resource.code = product_entity.resource.code;
      
      const inProduct = this.outProductRepository.create({
        ...outproductDetails,
        product: product_entity
      });
      await this.outProductRepository.save( inProduct );
      return { ...inProduct };
      
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto:PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.outProductRepository.find({
      take: limit,
      skip: offset,
    })

    return products.map( ( product ) => ({
      ...product
    }))
  }

  async findOne(term: string) {
    let product: OutProduct;

    if ( isUUID(term) ) {
      //product = await this.productRepository.findOneBy({ id: term });
      product = await this.outProductRepository
      .createQueryBuilder('prod')
      
      .where('prod.id = :id', { id: term })
      .getOne();;
    } else {
      const queryBuilder = this.outProductRepository.createQueryBuilder('prod'); 
      product = await queryBuilder
      .where("UPPER(prod.resource->>'name') = UPPER(:term) OR UPPER(prod.resource->>'code') = UPPER(:term) OR UPPER(prod.resource->>'serie') = UPPER(:term)", {
        term: term,  
      })
        .getOne();
    }


    if ( !product ) 
      throw new NotFoundException(`Product with ${ term } not found`);

    return product;
    }
  update(id: number, updateOutProductDto: UpdateOutProductDto) {
    return `This action updates a #${id} outProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} outProduct`;
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}

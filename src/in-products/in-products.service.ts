import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, Query } from '@nestjs/common';
import { CreateInProductDto } from './dto/create-in-product.dto';
import { UpdateInProductDto } from './dto/update-in-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { InProduct } from './entities/in-product.entity';
import { Product } from 'src/products/entities';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';




@Injectable()
export class InProductsService {
  private readonly logger = new Logger('InProductsService');
  
  constructor(

    @InjectRepository(InProduct)
    private readonly inProductRepository: Repository<InProduct>,
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>, 
  
    private readonly dataSource: DataSource,
  
  ) {}

  async create(createInProductDto: CreateInProductDto) {
    try {
      const {  product  , ...inproductDetails } = createInProductDto;
      let product_entity =  await this.ProductRepository.findOne({ where: { id: product } });
      product_entity.resource.stock += inproductDetails.resource.amount;
      await this.ProductRepository.save(product_entity);
      inproductDetails.resource.id_product =  product_entity.id;
      inproductDetails.resource.name =  product_entity.resource.name;
      inproductDetails.resource.code =  product_entity.resource.code;
      inproductDetails.resource.serie =  product_entity.resource.serie;

      const inProduct = this.inProductRepository.create({
        ...inproductDetails,
        product: product_entity
      });
      await this.inProductRepository.save( inProduct );
      return { ...inProduct };
      
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.inProductRepository.find({
      take: limit,
      skip: offset,
    })

    return products.map( ( product ) => ({
      ...product
    }))
  }

  async findOne(term: string) {
    let product: InProduct;

    if ( isUUID(term) ) {
      //product = await this.productRepository.findOneBy({ id: term });
      product = await this.inProductRepository
      .createQueryBuilder('prod')
      
      .where('prod.id = :id', { id: term })
      .getOne();;
    } else {
      const queryBuilder = this.inProductRepository.createQueryBuilder('prod'); 
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

  async update(
    id: string,
    updateInProductDto: UpdateInProductDto) {
      const { product, ...toUpdate } = updateInProductDto;
    const in_product = await this.inProductRepository.preload({ id, ...toUpdate });

    if ( !in_product ) throw new NotFoundException(`Product with id: ${ id } not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      if( product ) {
        in_product.product =  await this.ProductRepository.findOne({ where: { id: product } });
      }
      
      // await this.productRepository.save( in_product );
  
      
      await queryRunner.manager.save( in_product );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain( id );
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }


  async findOnePlain( term: string ) {
    const {  ...rest } = await this.findOne( term );
    return {
      ...rest
    }
  }

  remove(id: number) {
    return `This action removes a #${id} inProduct`;
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}

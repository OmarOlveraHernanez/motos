import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { validate as isUUID } from 'uuid';
import { ProductImage, Product } from './entities';
import { User } from '../auth/entities/user.entity';
import { Almacen } from 'src/almacen/entities/almacen.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    @InjectRepository(Almacen)
    private readonly almacenRepository: Repository<Almacen>,

    private readonly dataSource: DataSource,

  ) {}



  async create(createProductDto: CreateProductDto) {
    
    try {
      const { almacenes = [] , images = [], ...productDetails } = createProductDto;

      const product = this.productRepository.create({
        ...productDetails,
        images: images.map( image => this.productImageRepository.create({ url: image }) ),
        almacenes:await this.almacenRepository.findBy({ id: In(createProductDto.almacenes ) })
      });
      
      await this.productRepository.save( product );

      return { ...product, images };
      
    } catch (error) {
      this.handleDBExceptions(error);
    }


  }


  async findAll( paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      }
    })

    return products.map( ( product ) => ({
      ...product,
      images: product.images.map( img => img.url )
    }))
  }

  async findOne( term: string ) {

    let product: Product;

    if ( isUUID(term) ) {
      //product = await this.productRepository.findOneBy({ id: term });
      product = await this.productRepository
      .createQueryBuilder('pro')
      .leftJoinAndSelect('pro.almacenes', 'Almacenes')
      .leftJoinAndSelect('pro.images','prodImages')
      .where('pro.id = :id', { id: term })
      .getOne();;
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod'); 
      product = await queryBuilder
      .where("UPPER(prod.resource->>'name') = UPPER(:term) OR UPPER(prod.resource->>'code') = UPPER(:term) OR UPPER(prod.resource->>'serie') = UPPER(:term)", {
        term: term,  
      })
        .leftJoinAndSelect('prod.almacenes', 'Almacenes')
        .leftJoinAndSelect('prod.images','prodImages')
        .getOne();
    }


    if ( !product ) 
      throw new NotFoundException(`Product with ${ term } not found`);

    return product;
  }

  async findOnePlain( term: string ) {
    const { images = [], ...rest } = await this.findOne( term );
    return {
      ...rest,
      images: images.map( image => image.url )
    }
  }



  async update( id: string, updateProductDto: UpdateProductDto, user: User ) {

    const {almacenes, images, ...toUpdate } = updateProductDto;


    const product = await this.productRepository.preload({ id, ...toUpdate });

    if ( !product ) throw new NotFoundException(`Product with id: ${ id } not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      if( images ) {
        await queryRunner.manager.delete( ProductImage, { product: { id } });

        product.images = images.map( 
          image => this.productImageRepository.create({ url: image }) 
        )
      }
      
      // await this.productRepository.save( product );
  
      
      await queryRunner.manager.save( product );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain( id );
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }

  }

  async remove(id: string) {
    const product = await this.findOne( id );
    await this.productRepository.remove( product );
    
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

}

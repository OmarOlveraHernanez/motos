import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateAlmacenPaymentDto } from './dto/create-almacen_payment.dto';
import { UpdateAlmacenPaymentDto } from './dto/update-almacen_payment.dto';
import { Almacen } from 'src/almacen/entities/almacen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AlmacenPayment } from './entities/almacen_payment.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class AlmacenPaymentService {
  private readonly logger = new Logger('AlmacenPaymentService');

  constructor(

    @InjectRepository(Almacen)
    private readonly almacenRepository: Repository<Almacen>,
    @InjectRepository(AlmacenPayment)
    private readonly almacenpaymentRepository: Repository<AlmacenPayment>, 
  
    private readonly dataSource: DataSource,
  
  ) {}

   async create(createAlmacenPaymentDto: CreateAlmacenPaymentDto) {
    try {
      const {  almacen  , ...almacenPaymentDetails } = createAlmacenPaymentDto;
      let almacen_entity =  await this.almacenRepository.findOne({ where: { id: almacen } });
      if ( !almacen_entity ) throw new NotFoundException(`Product with id: ${ almacen_entity } not found`);
      const alamcenPayment = this.almacenpaymentRepository.create({
        ...almacenPaymentDetails,
        almacen: almacen_entity
      });
      await this.almacenpaymentRepository.save( alamcenPayment );
      return { almacen,...alamcenPayment };
      
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async findAll(paginationDto:PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const almacenes = await this.almacenpaymentRepository.find({
      take: limit,
      skip: offset,
    })

    return almacenes.map( ( almacen ) => ({
      ...almacen
    }))
  }

  async findOne(term: string) {
    let almacen_payment: AlmacenPayment;

    if ( isUUID(term) ) {
      almacen_payment = await this.almacenpaymentRepository
      .createQueryBuilder('almacen')
      //.leftJoinAndSelect('almacen.users', 'users')
      .where('almacen.id = :id', { id: term })
      .getOne();;
    } else {
      const queryBuilder = this.almacenpaymentRepository.createQueryBuilder('alm'); 
   
      almacen_payment = await queryBuilder
        .where("UPPER(alm.resource->>'date') = UPPER(:term)", {
          term: term,  
        })
        // .leftJoinAndSelect('alm.users','users')
        .getOne();

       
    }


    if ( !almacen_payment ) 
      throw new NotFoundException(`almacen_payment with ${ term } not found`);


    return almacen_payment;
  }

  async findOnePlain( term: string ) {
    const {...rest } = await this.findOne( term );
    return {
      ...rest
    }
  }

  async update(
    id: string,
     updateAlmacenPaymentDto: UpdateAlmacenPaymentDto) {
      const { almacen,...toUpdate } = updateAlmacenPaymentDto;
      const alamcen_pay = await this.almacenpaymentRepository.preload({ id ,...toUpdate });
      
      if ( !alamcen_pay ) throw new NotFoundException(`Product with id: ${ id } not found`);
  
      // Create query runner
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
  
      try {
  
        /*if( images ) {
          await queryRunner.manager.delete( ProductImage, { product: { id } });
  
          product.images = images.map( 
            image => this.productImageRepository.create({ url: image }) 
          )
        }*/
        
        // await this.productRepository.save( product );
        //product.user = user;
        
        await queryRunner.manager.save( alamcen_pay );
  
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
    const almacen = await this.findOne( id );
    await this.almacenpaymentRepository.remove( almacen );
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}

import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Almacen } from './entities/almacen.entity';
import { DataSource, In, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class AlmacenService {
  private readonly logger = new Logger('AlmacenService');

  constructor(

    @InjectRepository(Almacen)
    private readonly almacenRepository: Repository<Almacen>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly dataSource: DataSource,

  ) {}

   async create(createAlmacenDto: CreateAlmacenDto) {
    try {
      const { users = [], ...almacenDetails } = createAlmacenDto;
     
      const almacen = this.almacenRepository.create({
          ...almacenDetails, 
          users:await this.userRepository.findBy({ id: In(createAlmacenDto.users ) }) });
      
      await this.almacenRepository.save( almacen );
      const { id, resource } = almacen;
      return { id, resource };
      
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 0 } = paginationDto;

    const almacenes = await this.almacenRepository.find({
      take: limit,
      skip: offset,
    })

    return almacenes.map( ( almacen ) => ({
      ...almacen
    }))
  }

  async findOne(term: string) {
    let almacen: Almacen;

    if ( isUUID(term) ) {
      almacen = await this.almacenRepository
      .createQueryBuilder('almacen')
      .leftJoinAndSelect('almacen.users', 'users')
      .where('almacen.id = :id', { id: term })
      .getOne();;
    } else {
      const queryBuilder = this.almacenRepository.createQueryBuilder('alm'); 
   
      almacen = await queryBuilder
        .where("UPPER(alm.resource->>'name') = UPPER(:term) OR LOWER(alm.resource->>'description') = LOWER(:term)", {
          term: term,  
        })
        .leftJoinAndSelect('alm.users','users')
        .getOne();

       
    }


    if ( !almacen ) 
      throw new NotFoundException(`almacen with ${ term } not found`);

    return almacen;
  }



  async findOnePlain( term: string ) {
    const {users = [], ...rest } = await this.findOne( term );
    return {
      ...rest,
      users: users.map( user => ({id:user.id,email:user.email,fullName:user.fullName}) )
    }
  }



  async update(id: string, updateAlmacenDto: UpdateAlmacenDto) {
    const { users,...toUpdate } = updateAlmacenDto;


    const alamcen = await this.almacenRepository.preload({ id ,...toUpdate });
    console.log(alamcen)
    if ( !alamcen ) throw new NotFoundException(`Product with id: ${ id } not found`);

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
      
      await queryRunner.manager.save( alamcen );

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
    await this.almacenRepository.remove( almacen );
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

}

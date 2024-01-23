import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUser } from './entities/login.entity';
import { Almacen } from 'src/almacen/entities/almacen.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    @InjectRepository(Almacen)
    private readonly alamcenRepository: Repository<Almacen>,

    @InjectRepository(LoginUser)
    private readonly loginUserRepository: Repository<LoginUser>,

    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}
  
  async findOnePlain( term: string ) {
    const {  ...rest } = await this.findOne( term );
    return {
      ...rest
    }
  }



  async update( id: string, UpdateUserDto: UpdateUserDto ) {
  
    const { password , almacenes ,...toUpdate } = UpdateUserDto;


    const user = await this.userRepository.preload({ id, ...toUpdate, password: bcrypt.hashSync( password, 10 ) });

    if ( !user ) throw new NotFoundException(`Product with id: ${ id } not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

     
  
      
      await queryRunner.manager.save( user );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain( id );
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBErrors(error);
    }
  
  }

  async findOne( term: string ) {

    let user: User;

    if ( isUUID(term) ) {
      //product = await this.productRepository.findOneBy({ id: term });
      user = await this.userRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.almacenes', 'Almacenes')
      .where('u.id = :id', { id: term })
      .getOne();;
    } else {
      const queryBuilder = this.userRepository.createQueryBuilder('u'); 
      user = await queryBuilder
      .where("UPPER(u.resource->>'fullName') LIKE UPPER(:term) OR UPPER(u.resource->>'direction') LIKE UPPER(:term) OR UPPER(u.resource->>'phone') LIKE UPPER(:term)  OR u.email LIKE :term", {
        term: `%${term}%`,
      })
        .leftJoinAndSelect('u.almacenes', 'Almacenes')
        
        .getOne();
    }


    if ( !user ) 
      throw new NotFoundException(`Product with ${ term } not found`);

    return user;
  }

  async findAll( paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0 , term} = paginationDto;
    console.log(term);
    let users = [];
    if(!term)
    users = await this.userRepository.find({
      take: limit,
      skip: offset,
      relations: {
        almacenes: true,
      }
    });
    else{
      const queryBuilder = this.userRepository.createQueryBuilder('u'); 
      users = await queryBuilder
      .where("UPPER(u.resource->>'fullName') LIKE UPPER(:term) OR UPPER(u.resource->>'direction') LIKE UPPER(:term) OR UPPER(u.resource->>'phone') LIKE UPPER(:term)  OR u.email LIKE :term", {
        term: `%${term}%`,
      })
      .leftJoinAndSelect('u.almacenes', 'Almacenes')
      .getMany();;
    }
    


    

    return users.map( ( user ) => ({
      ...user
    }))
  }

  async create( createUserDto: CreateUserDto) {
    
    try {

      const { password, almacenes , ...userData } = createUserDto;
      let almacenes_entity = [];
      if(almacenes){
        almacenes_entity = await this.alamcenRepository.findBy({ id: In(almacenes ) })
      }

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 ),
        almacenes: almacenes_entity
      });

      await this.userRepository.save( user )
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };
      // TODO: Retornar el JWT de acceso

    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async login( loginUserDto: LoginUserDto , loginUser: any ) {

    const { password, email } = loginUserDto;
    
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }, //! OJO!,
      relations: ["almacenes"]
    });

    if ( !user ) 
      throw new UnauthorizedException('Credentials are not valid (email)');
      
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');
    loginUser.user = user;
    const login_user = this.loginUserRepository.create(loginUser);
   
    const response_log: any = await this.loginUserRepository.save(login_user)
    
    return {
      ...user,
      token: this.getJwtToken({ id: user.id ,id_log: response_log.id})
    };
  }

  async checkAuthStatus( user: User ){

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };

  }


  
  private getJwtToken( payload: JwtPayload ) {
  
    const token = this.jwtService.sign( payload );
    return token;

  }

  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }





}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDataUserDto } from './dto/create-data_user.dto';
import { UpdateDataUserDto } from './dto/update-data_user.dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataUser } from './entities/data_user.entity';

@Injectable()
export class DataUserService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(DataUser)
    private readonly dataUserRepository: Repository<DataUser>,
  ) {}

  async create(createDataUserDto: CreateDataUserDto,user:User) {
    const existingDataUser = await this.dataUserRepository.findOne({ where: { user: {id:user.id} } });
    if(existingDataUser) throw new NotFoundException(`data_user exist with id: ${ existingDataUser.id } use update`);

    let dataUser = await this.dataUserRepository.create({...createDataUserDto,user:user});
    dataUser = await this.dataUserRepository.save(dataUser);
    let user_update = await this.userRepository.findOne({ where: { id: user.id } });
    user_update.data_user = dataUser;
    await this.userRepository.save(user_update);
    return user_update;

  }

  async findOne(user:User) {
    const existingDataUser = await this.dataUserRepository.findOne({ where: { user: {id:user.id} } });
    if(!existingDataUser) throw new NotFoundException(`userdata roduct  not found`);
    return existingDataUser;
  }

  async update(user:User, updateDataUserDto: UpdateDataUserDto) {
    const existingDataUser = await this.dataUserRepository.findOne({ where: { user: {id:user.id} } });
    if(!existingDataUser) throw new NotFoundException(`userdata roduct  not found`);
    const updateDataUser = await this.dataUserRepository.preload({id: existingDataUser.id , ...updateDataUserDto });
    await this.dataUserRepository.save(updateDataUser);

    return updateDataUser;
  }

 
}

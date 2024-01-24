import { Injectable } from '@nestjs/common';
import { CreateDataUserDto } from './dto/create-data_user.dto';
import { UpdateDataUserDto } from './dto/update-data_user.dto';

@Injectable()
export class DataUserService {
  create(createDataUserDto: CreateDataUserDto) {
    return 'This action adds a new dataUser';
  }

  findAll() {
    return `This action returns all dataUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dataUser`;
  }

  update(id: number, updateDataUserDto: UpdateDataUserDto) {
    return `This action updates a #${id} dataUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataUser`;
  }
}

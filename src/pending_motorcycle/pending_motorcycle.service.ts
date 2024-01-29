import { Injectable } from '@nestjs/common';
import { CreatePendingMotorcycleDto } from './dto/create-pending_motorcycle.dto';
import { UpdatePendingMotorcycleDto } from './dto/update-pending_motorcycle.dto';

@Injectable()
export class PendingMotorcycleService {
  create(createPendingMotorcycleDto: CreatePendingMotorcycleDto) {
    return 'This action adds a new pendingMotorcycle';
  }

  findAll() {
    return `This action returns all pendingMotorcycle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pendingMotorcycle`;
  }

  update(id: number, updatePendingMotorcycleDto: UpdatePendingMotorcycleDto) {
    return `This action updates a #${id} pendingMotorcycle`;
  }

  remove(id: number) {
    return `This action removes a #${id} pendingMotorcycle`;
  }
}

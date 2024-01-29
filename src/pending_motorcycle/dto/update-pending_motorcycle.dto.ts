import { PartialType } from '@nestjs/swagger';
import { CreatePendingMotorcycleDto } from './create-pending_motorcycle.dto';

export class UpdatePendingMotorcycleDto extends PartialType(CreatePendingMotorcycleDto) {}

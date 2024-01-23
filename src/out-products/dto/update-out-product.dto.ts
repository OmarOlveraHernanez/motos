import { PartialType } from '@nestjs/swagger';
import { CreateOutProductDto } from './create-out-product.dto';

export class UpdateOutProductDto extends PartialType(CreateOutProductDto) {}

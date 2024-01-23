import { PartialType } from '@nestjs/swagger';
import { CreateInProductDto } from './create-in-product.dto';

export class UpdateInProductDto extends PartialType(CreateInProductDto) {}

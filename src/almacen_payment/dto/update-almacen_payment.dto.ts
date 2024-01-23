import { PartialType } from '@nestjs/swagger';
import { CreateAlmacenPaymentDto } from './create-almacen_payment.dto';

export class UpdateAlmacenPaymentDto extends PartialType(CreateAlmacenPaymentDto) {}

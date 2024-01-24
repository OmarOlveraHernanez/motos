import { PartialType } from '@nestjs/swagger';
import { CreateDataUserDto } from './create-data_user.dto';

export class UpdateDataUserDto extends PartialType(CreateDataUserDto) {}

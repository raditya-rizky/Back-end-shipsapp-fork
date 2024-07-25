import { PartialType } from '@nestjs/mapped-types';
import { CreatePengirimanDto } from './create-pengiriman.dto';

export class UpdatePengirimanDto extends PartialType(CreatePengirimanDto) {}

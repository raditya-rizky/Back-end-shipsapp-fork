import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import {
  CreatePengiriman,
  CreatePengirimanResponse,
} from './create-pengiriman.dto';

export class UpdatePengirimanDto extends createZodDto(CreatePengiriman) {}
export class UpdatePengirimanResponseDto extends createZodDto(
  CreatePengirimanResponse,
) {}

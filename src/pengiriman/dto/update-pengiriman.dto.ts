import { createZodDto } from '@wahyubucil/nestjs-zod-openapi'
import { CreatePengiriman } from './create-pengiriman.dto'

export class UpdatePengirimanDto extends createZodDto(CreatePengiriman) {}

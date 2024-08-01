import { createZodDto } from '@wahyubucil/nestjs-zod-openapi'
import { z } from 'zod'

export const CreateVendor = z.object({
  nama: z.string(),
  alamat: z.string(),
  pic: z.string(),
  no_telp: z.string(),
  email: z.string(),
  website: z.string(),
  pricelist_pdf: z.string().optional(),
}).openapi('CreateVendor')

export class CreateVendorDto extends createZodDto(CreateVendor) {}

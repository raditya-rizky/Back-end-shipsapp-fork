import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import { z } from 'zod';

export const CreateVendor = z
  .object({
    nama: z.string(),
    alamat: z.string(),
    pic: z.string(),
    no_telp: z.string(),
    email: z.string(),
    website: z.string(),
    pricelist_pdf: z.string().optional(),
  })
  .openapi('CreateVendor');

export const CreateVendorResponse = z
  .object({
    status: z.enum(['success', 'failed', 'unknown failed error']),
    code: z.string(),
    data: CreateVendor.optional(),
  })
  .openapi('CreateVendorResponse');

export class CreateVendorDto extends createZodDto(CreateVendor) {}
export class CreateVendorResponseDto extends createZodDto(
  CreateVendorResponse,
) {}

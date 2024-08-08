import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import { pengiriman } from 'src/pengiriman/dto/pengiriman.dto';
import { z } from 'zod';

export const vendors = z
  .object({
    id: z.string().cuid(),
    nama: z.string(),
    alamat: z.string(),
    pic: z.string(),
    no_telp: z.string(),
    email: z.string(),
    website: z.string(),
    pricelist_pdf: z.string().optional().nullable(),
    list_pengiriman: z.array(pengiriman).optional().nullable(),
  })
  .openapi('Vendor');

export class GetVendorDto extends createZodDto(z.array(vendors)) {}
export class GetOneVendorDto extends createZodDto(vendors) {}

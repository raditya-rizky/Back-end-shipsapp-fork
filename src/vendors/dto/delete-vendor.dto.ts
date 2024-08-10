import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import { pengiriman } from 'src/pengiriman/dto/pengiriman.dto';
import { z } from 'zod';

export const deleteVendor = z
  .object({
    status: z.enum(['success', 'failed', 'unknown failed error']),
    code: z.string(),
    id: z.string().cuid(),
  })
  .openapi('DeleteVendorResponse');

export class DeleteVendorResponseDto extends createZodDto(deleteVendor) {}

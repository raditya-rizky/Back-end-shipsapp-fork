import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import { z } from 'zod';
export const createOrder = z.object({
  pengiriman_id: z.string().cuid(),
  panjang: z.number(),
  lebar: z.number(),
  tinggi: z.number(),
  koli: z.number(),
  biaya_pengiriman: z.number(),
});

export class CreateOrderDto extends createZodDto(createOrder) {}

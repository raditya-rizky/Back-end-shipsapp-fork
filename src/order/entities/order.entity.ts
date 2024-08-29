import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import { pengiriman } from 'src/pengiriman/dto/pengiriman.dto';
import { z } from 'zod';

export const order = z
  .object({
    id: z.string().cuid(),
    panjang: z.number(),
    lebar: z.number(),
    tinggi: z.number(),
    koli: z.number(),
    biaya_pengiriman: z.number(),
    pengiriman: pengiriman,
  })
  .openapi('Order');

export class Order extends createZodDto(order) {}
export class Orders extends createZodDto(z.array(order)) {}

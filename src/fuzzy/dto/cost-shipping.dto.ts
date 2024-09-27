import { createZodDto } from '@wahyubucil/nestjs-zod-openapi'
import { z } from 'zod'

export const shipment = z.object({
    length: z.string(),
    width: z.string(),
    height: z.string(),
    quantity: z.string(),
    provinsi_awal: z.string().optional(),
    provinsi_tujuan: z.string().optional(),
    kabupaten_awal: z.string(),
    kabupaten_tujuan: z.string()
}).openapi('shippingCost')

export class shippingCost extends createZodDto(shipment){}
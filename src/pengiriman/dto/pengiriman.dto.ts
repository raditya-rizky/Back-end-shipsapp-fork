import { createZodDto } from '@wahyubucil/nestjs-zod-openapi'
import { z } from 'zod'

export const pengiriman = z.object({
  id: z.string().cuid(),
  vendorId: z.string().cuid(),
  provinsi_awal: z.string(),
  kabupaten_awal: z.string(),
  kecamatan_awal: z.string(),
  provinsi_tujuan: z.string(),
  kabupaten_tujuan: z.string(),
  kecamatan_tujuan: z.string(),
  min_charge: z.number(),
  price: z.number(),
  jarak_tempuh: z.string(),
  satuan_estimasi_waktu: z.string(),
  estimasi_tercepat: z.number(),
  estimasi_terlama: z.number(),
}).openapi('Pengiriman')

export class GetPengirimanDto extends createZodDto(z.array(pengiriman)) {}
export class GetOnePengirimanDto extends createZodDto(pengiriman) {}
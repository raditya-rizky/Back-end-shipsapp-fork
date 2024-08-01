import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import { z } from 'zod';

export const CreatePengiriman = z.object({
  vendorId: z.number(),
  provinsi_awal: z.string(),
  kabupaten_awal: z.string(),
  kecamatan_awal: z.string(),
  provinsi_tujuan: z.string(),
  kabupaten_tujuan: z.string(),
  kecamatan_tujuan: z.string(),
  min_charge: z.number(),
  price: z.number(),
  satuan_estimasi_waktu: z.string(),
  estimasi_tercepat: z.number(),
  estimasi_terlama: z.number(),
}).openapi('CreatePengiriman');

export class CreatePengirimanDto extends createZodDto(CreatePengiriman) {}

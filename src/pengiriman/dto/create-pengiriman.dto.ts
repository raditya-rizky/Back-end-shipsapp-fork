import { $Enums } from '@prisma/client';
import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import { z } from 'zod';

export const CreatePengiriman = z
  .object({
    vendorId: z.string().cuid(),
    provinsi_awal: z.string(),
    kabupaten_awal: z.string(),
    kecamatan_awal: z.string(),
    provinsi_tujuan: z.string(),
    kabupaten_tujuan: z.string(),
    kecamatan_tujuan: z.string(),
    min_charge: z.number(),
    price: z.number(),
    satuan_estimasi_waktu: z.enum([
      $Enums.SatuanEstimasiWaktu.Jam,
      $Enums.SatuanEstimasiWaktu.Hari,
      $Enums.SatuanEstimasiWaktu.Minggu,
      $Enums.SatuanEstimasiWaktu.Bulan,
      $Enums.SatuanEstimasiWaktu.Tahun,
    ]),
    estimasi_tercepat: z.number(),
    estimasi_terlama: z.number(),
  })
  .openapi('CreatePengiriman');

export const CreatePengirimanResponse = z
  .object({
    status: z.enum(['success', 'failed', 'unknown failed error']),
    code: z.string(),
    data: CreatePengiriman.optional(),
  })
  .openapi('CreatePengirimanResponse');

export class CreatePengirimanDto extends createZodDto(CreatePengiriman) {}
export class CreatePengirimanResponseDto extends createZodDto(
  CreatePengirimanResponse,
) {}

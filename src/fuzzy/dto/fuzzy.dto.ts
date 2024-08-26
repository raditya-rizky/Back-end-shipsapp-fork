import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import { z } from 'zod';

export const fuzzy = z.object({
  lokasi_awal: z.string(),
  lokasi_akhir: z.string(),
});

export class fuzzyDto extends createZodDto(fuzzy) {}

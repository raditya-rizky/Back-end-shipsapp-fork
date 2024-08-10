import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import { CreateVendor, CreateVendorResponse } from './create-vendor.dto';

export class UpdateVendorDto extends createZodDto(CreateVendor) {}
export class UpdateVendorResponseDto extends createZodDto(
  CreateVendorResponse,
) {}

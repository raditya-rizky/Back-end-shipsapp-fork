import { createZodDto } from '@wahyubucil/nestjs-zod-openapi'
import { CreateVendor } from './create-vendor.dto';

export class UpdateVendorDto extends createZodDto(CreateVendor) {}

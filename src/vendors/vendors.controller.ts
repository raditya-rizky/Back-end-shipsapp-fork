import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VendorsService } from './vendors.service';
import {
  CreateVendorDto,
  CreateVendorResponseDto,
} from './dto/create-vendor.dto';
import {
  UpdateVendorDto,
  UpdateVendorResponseDto,
} from './dto/update-vendor.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetOneVendorDto, GetVendorDto } from './dto/vendor.dto';
import { DeleteVendorResponseDto } from './dto/delete-vendor.dto';

@ApiTags('Vendor')
@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  @ApiOkResponse({ type: CreateVendorResponseDto })
  async create(@Body() createVendorDto: CreateVendorDto) {
    const vendor = await this.vendorsService.create(createVendorDto);
    return CreateVendorResponseDto.zodSchema.parse(vendor);
  }

  @Post('import')
  async importFromJson(): Promise<void> {
    const vendor = await this.vendorsService.importFromJsonFile('/../data-companies.json');
    
  }
  @Delete('delete')
  async deleteFromJson(): Promise<void> {
    await this.vendorsService.deleteFromJsonFile('/../data-companies.json');
  }
  @Get()
  @ApiOkResponse({ type: GetVendorDto })
  async findAll() {
    return GetVendorDto.zodSchema.parse(await this.vendorsService.findAll());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneVendorDto })
  async findOne(@Param('id') id: string) {
    return GetOneVendorDto.zodSchema.parse(
      await this.vendorsService.findOne(id),
    );
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateVendorResponseDto })
  async update(
    @Param('id') id: string,
    @Body() updateVendorDto: UpdateVendorDto,
  ) {
    return UpdateVendorResponseDto.zodSchema.parse(
      await this.vendorsService.update(id, updateVendorDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: DeleteVendorResponseDto })
  async remove(@Param('id') id: string) {
    return DeleteVendorResponseDto.zodSchema.parse(
      await this.vendorsService.remove(id),
    );
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PengirimanService } from './pengiriman.service';
import {
  CreatePengirimanDto,
  CreatePengirimanResponseDto,
} from './dto/create-pengiriman.dto';
import { UpdatePengirimanDto } from './dto/update-pengiriman.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetOnePengirimanDto, GetPengirimanDto } from './dto/pengiriman.dto';

@ApiTags('Pengiriman')
@Controller('pengiriman')
export class PengirimanController {
  constructor(private readonly pengirimanService: PengirimanService) {}

  @Post()
  @ApiOkResponse({ type: CreatePengirimanResponseDto })
  async create(@Body() createPengirimanDto: CreatePengirimanDto) {
    return CreatePengirimanResponseDto.zodSchema.parse(
      await this.pengirimanService.create(createPengirimanDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: GetPengirimanDto })
  async findAll() {
    return GetPengirimanDto.zodSchema.parse(await this.pengirimanService.findAll());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOnePengirimanDto })
  async findOne(@Param('id') id: string) {
    return GetOnePengirimanDto.zodSchema.parse(await this.pengirimanService.findOne(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePengirimanDto: UpdatePengirimanDto,
  ) {
    return UpdatePengirimanDto.zodSchema.parse(this.pengirimanService.update(id, updatePengirimanDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pengirimanService.remove(id);
  }
}

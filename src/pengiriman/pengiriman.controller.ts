import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PengirimanService } from './pengiriman.service';
import { CreatePengirimanDto } from './dto/create-pengiriman.dto';
import { UpdatePengirimanDto } from './dto/update-pengiriman.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pengiriman')
@Controller('pengiriman')
export class PengirimanController {
  constructor(private readonly pengirimanService: PengirimanService) {}

  @Post()
  create(@Body() createPengirimanDto: CreatePengirimanDto) {
    return this.pengirimanService.create(createPengirimanDto);
  }

  @Get()
  findAll() {
    return this.pengirimanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pengirimanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePengirimanDto: UpdatePengirimanDto) {
    return this.pengirimanService.update(+id, updatePengirimanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pengirimanService.remove(+id);
  }
}

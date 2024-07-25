import { Injectable } from '@nestjs/common';
import { CreatePengirimanDto } from './dto/create-pengiriman.dto';
import { UpdatePengirimanDto } from './dto/update-pengiriman.dto';

@Injectable()
export class PengirimanService {
  create(createPengirimanDto: CreatePengirimanDto) {
    return 'This action adds a new pengiriman';
  }

  findAll() {
    return `This action returns all pengiriman`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pengiriman`;
  }

  update(id: number, updatePengirimanDto: UpdatePengirimanDto) {
    return `This action updates a #${id} pengiriman`;
  }

  remove(id: number) {
    return `This action removes a #${id} pengiriman`;
  }
}

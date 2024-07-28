import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  create(createVendorDto: CreateVendorDto) {
     return this.prisma.vendor.create({
      data: {
        nama: createVendorDto.nama,
        alamat: createVendorDto.alamat,
        pic: createVendorDto.pic,
        no_telp: createVendorDto.no_telp,
        email: createVendorDto.email,
        website: createVendorDto.website,
        pricelist_pdf: createVendorDto.pricelist_pdf,
      },
    });
  }

  findAll() {
    return this.prisma.vendor.findMany({
      include: {
        list_pengiriman: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} vendor`;
  }

  update(id: number, updateVendorDto: UpdateVendorDto) {
    return `This action updates a #${id} vendor`;
  }

  remove(id: number) {
    return `This action removes a #${id} vendor`;
  }
}

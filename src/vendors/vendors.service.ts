import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  async create(createVendorDto: CreateVendorDto) {
    const data = await this.prisma.vendor.create({
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

    return {
      status: 'success',
      code: '201',
      data,
    };
  }

  findAll() {
    return this.prisma.vendor.findMany({
      include: {
        list_pengiriman: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.vendor.findUnique({
      where: {
        id,
      },
      include: {
        list_pengiriman: true,
      },
    });
  }

  async update(id: string, updateVendorDto: UpdateVendorDto) {
    const data = await this.prisma.vendor.update({
      data: updateVendorDto,
      where: {
        id,
      },
    });

    return {
      status: 'success',
      code: '200',
      data,
    };
  }

  async remove(id: string) {
    return this.prisma.vendor
      .delete({
        where: { id },
      })
      .then((data) => ({
        status: 'success',
        code: '200',
        id: data.id
      }));
  }
}

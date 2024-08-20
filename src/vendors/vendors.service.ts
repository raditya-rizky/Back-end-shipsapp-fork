import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  async create(createVendorDto: CreateVendorDto) {
    const data = await this.prisma.vendor.create({
      data: {
        nama: createVendorDto.nama,
        alamat: createVendorDto.alamat || '',
        pic: createVendorDto.pic || '',
        no_telp: createVendorDto.no_telp || '',
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
// ------------------------------------------------------------------
  async importFromJsonFile(filename: string): Promise<void> {
    const filePath = path.join(__dirname, '..', '..', filename);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

<<<<<<< Updated upstream
  findOne(id: string) {
    return this.prisma.vendor.findUnique({
      where: {
        id,
      },
      include: {
        list_pengiriman: true,
      },
    });
=======
    for (const item of data) {
      const createPlatformDto: CreateVendorDto = {
        nama: item.platform_name,
        alamat: item.company_address,
        pic: item.platform_logo,
        no_telp: item.company_no_telfon,
        email: item.company_email,
        website: item.app_url,
      };
      
      await this.create(createPlatformDto);
    }
  }
  async deleteByName(nama: string): Promise<void> {
    const result = await this.prisma.vendor.deleteMany({
      where: { nama },
    });
    if (result.count === 0) {
      throw new NotFoundException(`Vendor with name ${nama} not found`);
    }
  }
  async deleteFromJsonFile(filename: string): Promise<void> {
    const filePath = path.join(__dirname, '..', '..', filename);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const namesToDelete = data.map(item => item.platform_name);

    const result = await this.prisma.vendor.deleteMany({
      where: { nama: { in: namesToDelete } },
    });

    console.log(`Deleted ${result.count} vendors`);
  }
// ----------------------------------------------------------------------
  findOne(id: number) {
    return `This action returns a #${id} vendor`;
>>>>>>> Stashed changes
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

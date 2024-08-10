import { Injectable } from '@nestjs/common';
import { CreatePengirimanDto } from './dto/create-pengiriman.dto';
import { UpdatePengirimanDto } from './dto/update-pengiriman.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PengirimanService {
  constructor(private prisma: PrismaService) {}

  async create(createPengirimanDto: CreatePengirimanDto) {
    const lokasiAwal = `${(createPengirimanDto.kecamatan_awal, ',', createPengirimanDto.kabupaten_awal, ',', createPengirimanDto.provinsi_awal)}`;
    const lokasiTujuan = `${(createPengirimanDto.kecamatan_tujuan, ',', createPengirimanDto.kabupaten_tujuan, ',', createPengirimanDto.provinsi_tujuan)}`;

    const distance = await fetch(
      `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${lokasiAwal}&destinations=${lokasiTujuan}&key=${process.env.DMX_API_KEY}`,
    );

    const res = await distance.json();
    const distanceValue = res.rows[0].elements[0].distance.text;

    const data = await this.prisma.pengiriman.create({
      data: {
        vendorId: createPengirimanDto.vendorId,
        provinsi_awal: createPengirimanDto.provinsi_awal,
        kabupaten_awal: createPengirimanDto.kabupaten_awal,
        kecamatan_awal: createPengirimanDto.kecamatan_awal,
        provinsi_tujuan: createPengirimanDto.provinsi_tujuan,
        kabupaten_tujuan: createPengirimanDto.kabupaten_tujuan,
        kecamatan_tujuan: createPengirimanDto.kecamatan_tujuan,
        min_charge: createPengirimanDto.min_charge,
        price: createPengirimanDto.price,
        satuan_estimasi_waktu: createPengirimanDto.satuan_estimasi_waktu,
        estimasi_tercepat: createPengirimanDto.estimasi_tercepat,
        estimasi_terlama: createPengirimanDto.estimasi_terlama,
        jarak_tempuh: distanceValue.toString(),
      },
    });

    return {
      status: 'success',
      code: '201',
      data,
    };
  }

  findAll() {
    return this.prisma.pengiriman.findMany();
  }

  findOne(id: string) {
    return this.prisma.pengiriman.findUnique({
      where: { id },
    });
  }

  async update(id: string, updatePengirimanDto: UpdatePengirimanDto) {
    const lokasiAwal = `${(updatePengirimanDto.kecamatan_awal, ',', updatePengirimanDto.kabupaten_awal, ',', updatePengirimanDto.provinsi_awal)}`;
    const lokasiTujuan = `${(updatePengirimanDto.kecamatan_tujuan, ',', updatePengirimanDto.kabupaten_tujuan, ',', updatePengirimanDto.provinsi_tujuan)}`;

    const distance = await fetch(
      `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${lokasiAwal}&destinations=${lokasiTujuan}&key=${process.env.DMX_API_KEY}`,
    );

    const res = await distance.json();
    const distanceValue = res.rows[0].elements[0].distance.text;

    const data = await this.prisma.pengiriman.update({
      where: { id },
      data: {
        vendorId: updatePengirimanDto.vendorId,
        provinsi_awal: updatePengirimanDto.provinsi_awal,
        kabupaten_awal: updatePengirimanDto.kabupaten_awal,
        kecamatan_awal: updatePengirimanDto.kecamatan_awal,
        provinsi_tujuan: updatePengirimanDto.provinsi_tujuan,
        kabupaten_tujuan: updatePengirimanDto.kabupaten_tujuan,
        kecamatan_tujuan: updatePengirimanDto.kecamatan_tujuan,
        min_charge: updatePengirimanDto.min_charge,
        price: updatePengirimanDto.price,
        satuan_estimasi_waktu: updatePengirimanDto.satuan_estimasi_waktu,
        estimasi_tercepat: updatePengirimanDto.estimasi_tercepat,
        estimasi_terlama: updatePengirimanDto.estimasi_terlama,
        jarak_tempuh: distanceValue.toString(),
      },
    });

    return {
      status: 'success',
      code: '200',
      data,
    };
  }

  remove(id: string) {
    return this.prisma.pengiriman.delete({
      where: { id },
    });
  }
}

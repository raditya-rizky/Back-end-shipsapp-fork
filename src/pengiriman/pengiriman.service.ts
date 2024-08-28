import { Injectable } from '@nestjs/common';
import { CreatePengirimanDto } from './dto/create-pengiriman.dto';
import { UpdatePengirimanDto } from './dto/update-pengiriman.dto';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';
@Injectable()
export class PengirimanService {
  constructor(private prisma: PrismaService) { }

  async create(createPengirimanDto: CreatePengirimanDto) {
    let lokasiAwal = '';
    let lokasiTujuan = '';

    if (createPengirimanDto.kabupaten_awal === createPengirimanDto.kabupaten_tujuan) {
      // If kabupaten is the same, use provinsi
      lokasiAwal = createPengirimanDto.provinsi_awal;
      lokasiTujuan = createPengirimanDto.provinsi_tujuan;
    } else if (createPengirimanDto.provinsi_awal === createPengirimanDto.provinsi_tujuan) {
      // If provinsi is the same, use kabupaten
      lokasiAwal = createPengirimanDto.kabupaten_awal;
      lokasiTujuan = createPengirimanDto.kabupaten_tujuan;
    } else {
      // If both are different, use both kabupaten and provinsi
      lokasiAwal = `${createPengirimanDto.kabupaten_awal}, ${createPengirimanDto.provinsi_awal}`;
      lokasiTujuan = `${createPengirimanDto.kabupaten_tujuan}, ${createPengirimanDto.provinsi_tujuan}`;
    }

    const distance = await fetch(
      `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${lokasiAwal}&destinations=${lokasiTujuan}&key=${process.env.DMX_API_KEY}`,
    );

    const res = await distance.json();
    const distanceValue = res.rows[0].elements[0].distance.text;
    console.log(lokasiAwal, lokasiTujuan)
    const data = await this.prisma.pengiriman.create({
      data: {
        provinsi_awal: createPengirimanDto.provinsi_awal,
        kabupaten_awal: createPengirimanDto.kabupaten_awal,
        kecamatan_awal: createPengirimanDto.kecamatan_awal || '',
        provinsi_tujuan: createPengirimanDto.provinsi_tujuan,
        kabupaten_tujuan: createPengirimanDto.kabupaten_tujuan,
        kecamatan_tujuan: createPengirimanDto.kecamatan_tujuan || '',
        min_charge: createPengirimanDto.min_charge,
        price: createPengirimanDto.price,
        satuan_estimasi_waktu: createPengirimanDto.satuan_estimasi_waktu,
        estimasi_tercepat: createPengirimanDto.estimasi_tercepat,
        estimasi_terlama: createPengirimanDto.estimasi_terlama,
        jarak_tempuh: distanceValue.toString(),
        Vendor: {
          connect: {
            id: createPengirimanDto.vendorId,
          },
        }
      },
    });

    return {
      status: 'success',
      code: '201',
      data,
    };
  }

  async createManyFromJson(): Promise<void> {
    const fs = require('fs');
    try {
      // Baca file JSON
      const jsonData = fs.readFileSync('Sac.json', 'utf8');
      const pengirimanData = JSON.parse(jsonData);

      // Iterasi melalui data JSON dan gunakan fungsi create untuk setiap objek
      for (const [index, data] of pengirimanData.entries()) {
        try {
          const createPengirimanDto = new CreatePengirimanDto();
          createPengirimanDto.vendorId = data.vendorId;
          createPengirimanDto.provinsi_awal = data.provinsi_awal;
          createPengirimanDto.kabupaten_awal = data.kabupaten_awal;
          createPengirimanDto.kecamatan_awal = data.kecamatan_awal;
          createPengirimanDto.provinsi_tujuan = data.provinsi_tujuan;
          createPengirimanDto.kabupaten_tujuan = data.kabupaten_tujuan;
          createPengirimanDto.kecamatan_tujuan = data.kecamatan_tujuan;
          createPengirimanDto.min_charge = data.min_charge;
          createPengirimanDto.price = data.price;
          createPengirimanDto.satuan_estimasi_waktu = data.satuan_estimasi_waktu;
          createPengirimanDto.estimasi_tercepat = data.estimasi_tercepat;
          createPengirimanDto.estimasi_terlama = data.estimasi_terlama;

          // Log the data being processed
          console.log(`Processing record ${index + 1}:`, data);

          // Memanggil fungsi create untuk setiap data
          await this.create(createPengirimanDto);

        } catch (error) {
          if (error instanceof Error) {
            console.error(`Error processing record ${index + 1}:`, data);
            console.error('Error message:', error.message);
          } else {
            console.error(`Unknown error processing record ${index + 1}:`, data);
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to read or parse JSON file:', error.message);
      } else {
        console.error('Unknown error reading or parsing JSON file');
      }
    }
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

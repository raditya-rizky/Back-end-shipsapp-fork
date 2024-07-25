export class CreatePengirimanDto {
  vendorId: number;
  provinsi_awal: string;
  kabupaten_awal: string;
  kecamatan_awal: string;
  provinsi_tujuan: string;
  kabupaten_tujuan: string;
  kecamatan_tujuan: string;
  min_charge: number;
  price: number;
  satuan_estimasi_waktu: string;
  estimasi_tercepat: number;
  estimasi_terlama: number;
}

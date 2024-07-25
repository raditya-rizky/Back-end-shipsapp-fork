import { Pengiriman } from 'src/pengiriman/entities/pengiriman.entity';

export class Vendor {
  id: number;
  nama: string;
  alamat: string;
  pic: string;
  no_telp: string;
  email: string;
  website: string;
  pricelist_pdf: string;
  pengiriman: Pengiriman[];
}

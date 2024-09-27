import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DeliveryService } from './fuzzy.service';
import { ApiTags } from '@nestjs/swagger';
import { shippingCost } from './dto/cost-shipping.dto';

@ApiTags('Shimpent')
@Controller('shipping')
@ApiTags('Shipping')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}
  @Post('cost')
  getShippingCost(@Body() shippingcost: shippingCost) {
    const length = parseFloat(shippingcost.length);
    const width = parseFloat(shippingcost.width);
    const height = parseFloat(shippingcost.height);
    const quantity = parseInt(shippingcost.quantity, 10);
    const provinsi_awal = shippingcost.provinsi_awal;
    const kabupaten_awal = shippingcost.kabupaten_awal;
    const provinsi_tujuan = shippingcost.provinsi_tujuan;
    const kabupaten_tujuan = shippingcost.kabupaten_tujuan;
    const ShippingCost = this.deliveryService.getShippingCost(
      length,
      width,
      height,
      quantity,
      provinsi_awal,
      provinsi_tujuan,
      kabupaten_awal,
      kabupaten_tujuan,
    );
    const companies = this.deliveryService.selectDeliveryCompany(
      provinsi_awal,
      provinsi_tujuan,
      kabupaten_awal,
      kabupaten_tujuan,
      quantity,
    )[0];
    const terpilih = companies.company.list_pengiriman;
    return { ShippingCost, companies, terpilih };
  }
}

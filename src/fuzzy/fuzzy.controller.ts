import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DeliveryService, ongkir } from './fuzzy.service';
import { ApiTags } from '@nestjs/swagger';
import { fuzzyDto } from './dto/fuzzy.dto';

@Controller('shipping')
@ApiTags('Shipping')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post('cost')
  async getShippingCost(
    @Query('length') length: string,
    @Query('width') width: string,
    @Query('height') height: string,
    @Query('quantity') quantity: string,
    @Body() criteria: fuzzyDto,
  ): Promise<any> {
    const lengthNum = parseFloat(length);
    const widthNum = parseFloat(width);
    const heightNum = parseFloat(height);
    const quantityNum = parseInt(quantity, 10);
    const shippingCost = this.deliveryService.getShippingCost(
      lengthNum,
      widthNum,
      heightNum,
      quantityNum,
      criteria,
    );
    const companies = this.deliveryService.selectDeliveryCompany(criteria)[0];
    const terpilih = companies.company.list_pengiriman;
    return {
      shippingCost,
      companies,
      terpilih,
    };
  }
}

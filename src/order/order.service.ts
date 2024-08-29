import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private readonly mailService: MailerService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const data = await this.prisma.order.create({
      data: {
        pengiriman_id: createOrderDto.pengiriman_id,
        panjang: createOrderDto.panjang,
        lebar: createOrderDto.lebar,
        tinggi: createOrderDto.tinggi,
        koli: createOrderDto.koli,
        biaya_pengiriman: createOrderDto.biaya_pengiriman,
      },
    });

    const isSuccessSendEmail = await this.mailService.sendMail({
      from: 'Sarana Logistic <raditya2678@gmail.com>',
      bcc: ['raditya2678@gmail.com'],
      subject: `Pengadaan Barang Baru`,
      html: `
      <p>Order Id: ${data.pengiriman_id}</p>
      <p>Dimensi: ${data.panjang} x ${data.lebar} x ${data.tinggi}</p>
      <p>Koli: ${data.koli}</p>
      <p>Biaya Pengiriman: ${data.biaya_pengiriman}</p>
      `,
    });

    return {
      status: isSuccessSendEmail && 'success',
      code: '201',
      data,
    };
  }

  findAll() {
    return this.prisma.order.findMany({
      include: {
        pengiriman: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        pengiriman: true,
      },
    });;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

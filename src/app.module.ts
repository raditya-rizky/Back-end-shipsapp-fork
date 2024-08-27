import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from '@wahyubucil/nestjs-zod-openapi';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeliveryService, ongkir } from './fuzzy/fuzzy.service';
import { DeliveryController } from './fuzzy/fuzzy.controller';
import { VendorsModule } from './vendors/vendors.module';
import { PengirimanModule } from './pengiriman/pengiriman.module';
import { PrismaModule } from './prisma.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [VendorsModule, PengirimanModule, PrismaModule, OrderModule],
  controllers: [AppController, DeliveryController],
  providers: [
    AppService,
    ongkir,
    DeliveryService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}

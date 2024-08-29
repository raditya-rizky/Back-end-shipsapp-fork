import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from '@wahyubucil/nestjs-zod-openapi';
import { ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeliveryService, ongkir } from './fuzzy/fuzzy.service';
import { DeliveryController } from './fuzzy/fuzzy.controller';
import { VendorsModule } from './vendors/vendors.module';
import { PengirimanModule } from './pengiriman/pengiriman.module';
import { PrismaModule } from './prisma.module';
import { OrderModule } from './order/order.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    VendorsModule,
    PengirimanModule,
    PrismaModule,
    OrderModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
  ],
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

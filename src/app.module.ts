import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeliveryService, ongkir } from './fuzzy/fuzzy.service';
import { DeliveryController, } from './fuzzy/fuzzy.controller';

@Module({
  imports: [],
  controllers: [AppController,DeliveryController],
  providers: [AppService, ongkir,DeliveryService],
})
export class AppModule {}

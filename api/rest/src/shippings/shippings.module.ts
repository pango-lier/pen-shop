import { Module } from '@nestjs/common';
import { ShippingsService } from './shippings.service';
import { ShippingsController } from './shippings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipping } from './entities/shipping.entity';
import { ShippingStore } from './shipping.store';

@Module({
  imports: [TypeOrmModule.forFeature([Shipping])],
  controllers: [ShippingsController],
  providers: [ShippingsService, ShippingStore],
})
export class ShippingsModule {}

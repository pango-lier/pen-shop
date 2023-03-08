import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { GetShippingsDto } from './dto/get-shippings.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { Shipping } from './entities/shipping.entity';
import shippingsJson from '@db/shippings.json';
import { ShippingStore } from './shipping.store';

const shippings = plainToClass(Shipping, shippingsJson);

@Injectable()
export class ShippingsService {
  constructor(private readonly shippingStore: ShippingStore) {}
  private shippings: Shipping[] = shippings;

  create(createShippingDto: CreateShippingDto) {
    return this.shippingStore.create(createShippingDto);
  }

  getShippings(getShippingsDto: GetShippingsDto) {
    return this.shippingStore.all(getShippingsDto);
  }

  findOne(id: number) {
    return this.shippingStore.findById(id);
  }

  update(id: number, updateShippingDto: UpdateShippingDto) {
    return this.shippingStore.update(id, updateShippingDto);
  }

  remove(id: number) {
    return this.shippingStore.softDelete(id);
  }
}

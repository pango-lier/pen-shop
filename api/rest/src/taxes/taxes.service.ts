import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Tax } from './entities/tax.entity';
import taxesJson from '@db/taxes.json';
import { TaxesStore } from './taxes.store';
import { GetTaxesDto } from './dto/get-taxes.dto';

const taxes = plainToClass(Tax, taxesJson);

@Injectable()
export class TaxesService {
  constructor(private readonly taxStore: TaxesStore) {}
  private taxes: Tax[] = taxes;

  create(createTaxDto: CreateTaxDto) {
    return this.taxStore.create(createTaxDto);
  }

  findAll(getDto: GetTaxesDto) {
    return this.taxStore.all(getDto);
  }

  findOne(id: number) {
    return this.taxStore.findById(id);
  }

  update(id: number, updateTaxDto: UpdateTaxDto) {
    return this.taxStore.update(id, updateTaxDto);
  }

  remove(id: number) {
    return this.taxStore.softDelete(id);
  }
}

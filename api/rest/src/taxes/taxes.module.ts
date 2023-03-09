import { Module } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { TaxesController } from './taxes.controller';
import { TaxesStore } from './taxes.store';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tax } from './entities/tax.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tax])],
  controllers: [TaxesController],
  providers: [TaxesService, TaxesStore],
})
export class TaxesModule {}

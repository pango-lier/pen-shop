import { Module } from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import {
  ManufacturersController,
  TopManufacturersController,
} from './manufacturers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manufacturer } from './entities/manufacturer.entity';
import { ManufacturersStore } from './manufacturers.store';

@Module({
  imports: [TypeOrmModule.forFeature([Manufacturer])],
  controllers: [ManufacturersController, TopManufacturersController],
  providers: [ManufacturersService, ManufacturersStore],
})
export class ManufacturersModule {}

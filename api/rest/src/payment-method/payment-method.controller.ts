import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { GetPaymentMethodsDto } from './dto/get-payment-methods.dto';
import { DefaultCart } from './dto/set-default-card.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PaymentMethodService } from './payment-method.service';
import { jwtAuthGuard } from '../auth/jwt-auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/jwt-auth/decorator/user.decorator';
import { ICurrentUser } from '../auth/jwt-auth/interface/authenticated-user.interface';

@UseGuards(jwtAuthGuard)
@Controller('cards')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  create(
    @Body() createPaymentMethodDto: CreatePaymentMethodDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.paymentMethodService.create(createPaymentMethodDto, +user.id);
  }

  @Get()
  findAll(@Query() getTaxesDto: GetPaymentMethodsDto) {
    return this.paymentMethodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentMethodService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaxDto: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodService.update(+id, updateTaxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentMethodService.remove(+id);
  }
}

@UseGuards(jwtAuthGuard)
@Controller('/save-payment-method')
export class SavePaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}
  @Post()
  savePaymentMethod(
    @Body() createPaymentMethodDto: CreatePaymentMethodDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    createPaymentMethodDto.default_card = false;
    return this.paymentMethodService.savePaymentMethod(
      createPaymentMethodDto,
      +user.id,
    );
  }
}

@Controller('/set-default-card')
export class SetDefaultCartController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}
  @Post()
  setDefaultCart(@Body() defaultCart: DefaultCart) {
    return this.paymentMethodService.saveDefaultCart(defaultCart);
  }
}

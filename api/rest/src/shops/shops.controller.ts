import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { GetShopsDto, ShopPaginator } from './dto/get-shops.dto';
import { GetStaffsDto } from './dto/get-staffs.dto';
import { UserPaginator } from 'src/users/dto/get-users.dto';
import { CurrentUser } from 'src/auth/jwt-auth/decorator/user.decorator';
import { ICurrentUser } from 'src/auth/jwt-auth/interface/authenticated-user.interface';
import { jwtAuthGuard } from 'src/auth/jwt-auth/guards/jwt-auth.guard';


@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) { }

  @UseGuards(jwtAuthGuard)
  @Post()
  create(@Body() createShopDto: CreateShopDto, @CurrentUser() user: ICurrentUser) {
    createShopDto.owner_id = +user.id;
    return this.shopsService.create(createShopDto);
  }

  @Get()
  async getShops(@Query() query: GetShopsDto): Promise<ShopPaginator> {
    return this.shopsService.getShops(query);
  }

  @Get(':slug')
  async getShop(@Param('slug') slug: string) {
    return this.shopsService.getShop(slug);
  }

  @UseGuards(jwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(+id, updateShopDto);
  }

  @UseGuards(jwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopsService.remove(+id);
  }

  @Post('approve')
  approveShop(@Param('id') id: string) {
    return this.shopsService.approve(+id);
  }

  @Post('disapprove')
  disapproveShop(@Param('id') id: string) {
    return this.shopsService.approve(+id);
  }
}

@Controller('staffs')
export class StaffsController {
  constructor(private readonly shopsService: ShopsService) { }

  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopsService.create(createShopDto);
  }

  @Get()
  async getStaffs(@Query() query: GetStaffsDto): Promise<UserPaginator> {
    return this.shopsService.getStaffs(query);
  }

  @Get(':slug')
  async getShop(@Param('slug') slug: string) {
    return this.shopsService.getShop(slug);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(+id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopsService.remove(+id);
  }
}

@Controller('disapprove-shop')
export class DisapproveShopController {
  constructor(private shopsService: ShopsService) { }

  @Post()
  async disapproveShop(@Body('id') id) {
    return this.shopsService.disapproveShop(id);
  }
}

@Controller('approve-shop')
export class ApproveShopController {
  constructor(private shopsService: ShopsService) { }

  @Post()
  async approveShop(@Body('id') id) {
    return this.shopsService.approveShop(id);
  }
}

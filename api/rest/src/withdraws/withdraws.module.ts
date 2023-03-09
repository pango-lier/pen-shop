import { Module } from '@nestjs/common';
import { WithdrawsService } from './withdraws.service';
import { WithdrawsController } from './withdraws.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Withdraw } from './entities/withdraw.entity';
import { WithdrawsStore } from './withdraws.store';

@Module({
  imports: [TypeOrmModule.forFeature([Withdraw])],
  controllers: [WithdrawsController],
  providers: [WithdrawsService, WithdrawsStore],
})
export class WithdrawsModule {}

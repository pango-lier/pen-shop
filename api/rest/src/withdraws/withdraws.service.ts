import { Injectable } from '@nestjs/common';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { ApproveWithdrawDto } from './dto/approve-withdraw.dto';
import { Withdraw } from './entities/withdraw.entity';
import { GetWithdrawsDto, WithdrawPaginator } from './dto/get-withdraw.dto';
import { paginate } from 'src/common/pagination/paginate';
import { WithdrawsStore } from './withdraws.store';

@Injectable()
export class WithdrawsService {
  constructor(private readonly withdrawStore: WithdrawsStore) {}
  private withdraws: Withdraw[] = [];

  create(createWithdrawDto: CreateWithdrawDto) {
    return this.withdrawStore.create(createWithdrawDto);
  }
  getWithdraws(getDto: GetWithdrawsDto) {
    return this.withdrawStore.findPaginate(getDto);
  }

  getWithdrawsOld({
    limit,
    page,
    status,
    shop_id,
  }: GetWithdrawsDto): WithdrawPaginator {
    if (!page) page = 1;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Withdraw[] = this.withdraws;
    // if (status) {
    //   data = fuse.search(status)?.map(({ item }) => item);
    // }

    if (shop_id) {
      data = this.withdraws.filter((p) => p.shop_id === shop_id);
    }
    const results = data.slice(startIndex, endIndex);
    const url = `/withdraws?limit=${limit}`;

    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  findOne(id: number) {
    return this.withdrawStore.findById(id);
  }

  update(id: number, updateWithdrawDto: ApproveWithdrawDto) {
    return this.withdrawStore.update(id, updateWithdrawDto);
  }

  remove(id: number) {
    return this.withdrawStore.softDelete(id);
  }
}

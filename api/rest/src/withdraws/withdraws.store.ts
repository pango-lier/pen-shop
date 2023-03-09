import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { UsersService } from 'src/users/users.service';
import slugify from 'slugify';
import { Withdraw } from './entities/withdraw.entity';
import { GetWithdrawsDto } from './dto/get-withdraw.dto';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { ApproveWithdrawDto } from './dto/approve-withdraw.dto';

@Injectable()
export class WithdrawsStore {
  constructor(
    @InjectRepository(Withdraw)
    private readonly baseRepo: Repository<Withdraw>,
    private readonly userService: UsersService,
    private readonly paginate: PaginateService,
  ) {}

  async create(createDto: CreateWithdrawDto) {
    const create = this.baseRepo.create(createDto);
    return await this.baseRepo.save(create);
  }

  async update(id: number, updateDto: ApproveWithdrawDto) {
    const create = await this.baseRepo.findOne({ where: { id } });
    return await this.baseRepo.save({ ...create, ...updateDto });
  }

  async findById(id: number) {
    return await this.baseRepo.findOne({
      where: [{ id }],
    });
  }

  async all(getWithdrawDto: GetWithdrawsDto) {
    const paginate = this.paginate.mapPaginate(getWithdrawDto);
    const query = this.baseRepo.createQueryBuilder('withdraw');
    query.leftJoinAndSelect('withdraw.shop', 'shop');
    const { results } = await this.paginate.queryRawFilter(
      query,
      paginate,
      ['id', 'shop.name', 'note', 'status'],
      {
        defaultTable: 'withdraw',
        getQuery: 'getMany',
      },
    );
    return results;
  }

  async findPaginate(getWithdrawDto: GetWithdrawsDto) {
    const paginate = this.paginate.mapPaginate(getWithdrawDto);
    console.log(paginate);
    const query = this.baseRepo.createQueryBuilder('withdraw');
    query.leftJoinAndSelect('withdraw.shop', 'shop');
    return await this.paginate.queryFilter(
      query,
      paginate,
      ['id', 'shop.name', 'note', 'status'],
      {
        defaultTable: 'withdraw',
        getQuery: 'getMany',
      },
    );
  }

  async softDelete(id: number) {
    return await this.baseRepo.softDelete(id);
  }

  repo() {
    return this.baseRepo;
  }
}

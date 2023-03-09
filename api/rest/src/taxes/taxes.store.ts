import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { UsersService } from 'src/users/users.service';
import slugify from 'slugify';
import { Tax } from './entities/tax.entity';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { GetTaxesDto } from './dto/get-taxes.dto';

@Injectable()
export class TaxesStore {
  constructor(
    @InjectRepository(Tax)
    private readonly baseRepo: Repository<Tax>,
    private readonly userService: UsersService,
    private readonly paginate: PaginateService,
  ) {}

  async create(createDto: CreateTaxDto) {
    const create = this.baseRepo.create(createDto);
    return await this.baseRepo.save(create);
  }

  async update(id: number, updateDto: UpdateTaxDto) {
    const create = await this.baseRepo.findOne({ where: { id } });
    return await this.baseRepo.save({ ...create, ...updateDto });
  }

  async findById(id: number) {
    return await this.baseRepo.findOne({
      where: [{ id }],
    });
  }

  async all(getTaxDto: GetTaxesDto) {
    const paginate = this.paginate.mapPaginate(getTaxDto);
    const query = this.baseRepo.createQueryBuilder('tax');
    // query.leftJoinAndSelect('Tax.type', 'type');
    const { results } = await this.paginate.queryRawFilter(
      query,
      paginate,
      ['id', 'name'],
      {
        defaultTable: 'tax',
        getQuery: 'getMany',
      },
    );
    return results;
  }

  async findByIdOrSlug(idOrSlug: string) {
    let filter: any = { slug: idOrSlug };
    if (Number(idOrSlug)) filter = { id: Number(idOrSlug) };
    return await this.baseRepo.findOne({
      where: filter,
    });
  }

  async findPaginate(getTaxDto: GetTaxesDto) {
    const paginate = this.paginate.mapPaginate(getTaxDto);
    console.log(paginate);
    const query = this.baseRepo.createQueryBuilder('tax');
    // query.leftJoinAndSelect('Tax.type', 'type');
    return await this.paginate.queryFilter(query, paginate, ['id', 'name'], {
      defaultTable: 'tax',
      getQuery: 'getMany',
    });
  }

  async findByName(name: string) {
    return await this.baseRepo.findOne({
      where: { name },
    });
  }

  async softDelete(id: number) {
    return await this.baseRepo.softDelete(id);
  }

  repo() {
    return this.baseRepo;
  }
}

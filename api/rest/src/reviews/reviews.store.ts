import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { UsersService } from 'src/users/users.service';
import slugify from 'slugify';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { GetReviewsDto } from './dto/get-reviews.dto';

@Injectable()
export class ReviewsStore {
  constructor(
    @InjectRepository(Review)
    private readonly baseRepo: Repository<Review>,
    private readonly userService: UsersService,
    private readonly paginate: PaginateService,
  ) {}

  async create(createDto: CreateReviewDto) {
    const create = this.baseRepo.create(createDto);
    return await this.baseRepo.save(create);
  }

  async update(id: number, updateDto: UpdateReviewDto) {
    const create = await this.baseRepo.findOne({ where: { id } });
    return await this.baseRepo.save({ ...create, ...updateDto });
  }

  async findById(id: number) {
    return await this.baseRepo.findOne({
      where: [{ id }],
    });
  }

  async all(getReviewDto: GetReviewsDto) {
    const paginate = this.paginate.mapPaginate(getReviewDto);
    const query = this.baseRepo.createQueryBuilder('review');
    query.leftJoinAndSelect('review.shop', 'shop');
    const { results } = await this.paginate.queryRawFilter(
      query,
      paginate,
      ['id', 'shop.name', 'note', 'status'],
      {
        defaultTable: 'review',
        getQuery: 'getMany',
      },
    );
    return results;
  }

  async findPaginate(getReviewDto: GetReviewsDto) {
    const paginate = this.paginate.mapPaginate(getReviewDto);
    console.log(paginate);
    const query = this.baseRepo.createQueryBuilder('review');
    query.leftJoinAndSelect('review.shop', 'shop');
    return await this.paginate.queryFilter(
      query,
      paginate,
      ['id', 'shop.name', 'note', 'status'],
      {
        defaultTable: 'review',
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

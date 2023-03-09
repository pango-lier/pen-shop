import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { UsersService } from 'src/users/users.service';
import slugify from 'slugify';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedBackDto } from './dto/create-feedback.dto';
import { UpdateFeedBackDto } from './dto/update-feedback.dto';
import { GetFeedbacksDto } from './dto/get-feedbacks.dto';

@Injectable()
export class FeedbacksStore {
  constructor(
    @InjectRepository(Feedback)
    private readonly baseRepo: Repository<Feedback>,
    private readonly userService: UsersService,
    private readonly paginate: PaginateService,
  ) { }

  async create(createDto: CreateFeedBackDto) {
    const create = this.baseRepo.create(createDto);
    return await this.baseRepo.save(create);
  }

  async update(id: number, updateDto: UpdateFeedBackDto) {
    const create = await this.baseRepo.findOne({ where: { id } });
    return await this.baseRepo.save({ ...create, ...updateDto });
  }

  async findById(id: number) {
    return await this.baseRepo.findOne({
      where: [{ id }],
    });
  }

  async all(getFeedbackDto: GetFeedbacksDto) {
    const paginate = this.paginate.mapPaginate(getFeedbackDto);
    const query = this.baseRepo.createQueryBuilder('feedback');
    query.leftJoinAndSelect('feedback.image', 'image');
    const { results } = await this.paginate.queryRawFilter(
      query,
      paginate,
      ['id', 'code', 'description'],
      {
        defaultTable: 'feedback',
        getQuery: 'getMany',
      },
    );
    return results;
  }

  async findPaginate(getFeedbackDto: GetFeedbacksDto) {
    const paginate = this.paginate.mapPaginate(getFeedbackDto);
    console.log(paginate);
    const query = this.baseRepo.createQueryBuilder('feedback');
    query.leftJoinAndSelect('feedback.image', 'image');
    return await this.paginate.queryFilter(
      query,
      paginate,
      ['id', 'code', 'description'],
      {
        defaultTable: 'feedback',
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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { UsersService } from 'src/users/users.service';
import slugify from 'slugify';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateAnswerQuestionDto } from './dto/update-question.dto';
import { GetQuestionDto } from './dto/get-questions.dto';

@Injectable()
export class QuestionsStore {
  constructor(
    @InjectRepository(Question)
    private readonly baseRepo: Repository<Question>,
    private readonly userService: UsersService,
    private readonly paginate: PaginateService,
  ) {}

  async create(createDto: CreateQuestionDto) {
    const create = this.baseRepo.create(createDto);
    return await this.baseRepo.save(create);
  }

  async update(id: number, updateDto: UpdateAnswerQuestionDto) {
    const create = await this.baseRepo.findOne({ where: { id } });
    return await this.baseRepo.save({ ...create, ...updateDto });
  }

  async findById(id: number) {
    return await this.baseRepo.findOne({
      where: [{ id }],
    });
  }

  async all(getQuestionDto: GetQuestionDto) {
    const paginate = this.paginate.mapPaginate(getQuestionDto);
    const query = this.baseRepo.createQueryBuilder('question');
    query.leftJoinAndSelect('question.shop', 'shop');
    query.leftJoinAndSelect('question.user', 'user');
    query.leftJoinAndSelect('question.product', 'product');
    const { results } = await this.paginate.queryRawFilter(
      query,
      paginate,
      ['id', 'shop.name'],
      {
        defaultTable: 'question',
        getQuery: 'getMany',
      },
    );
    return results;
  }

  async findPaginate(getQuestionDto: GetQuestionDto) {
    const paginate = this.paginate.mapPaginate(getQuestionDto);
    console.log(paginate);
    const query = this.baseRepo.createQueryBuilder('question');
    query.leftJoinAndSelect('question.shop', 'shop');
    query.leftJoinAndSelect('question.user', 'user');
    query.leftJoinAndSelect('question.product', 'product');
    return await this.paginate.queryFilter(
      query,
      paginate,
      ['id', 'shop.name'],
      {
        defaultTable: 'question',
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

import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { paginate } from 'src/common/pagination/paginate';
import { Question } from './entities/question.entity';
import { GetQuestionDto } from './dto/get-questions.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import {
  UpdateAnswerQuestionDto,
  UpdateQuestionDto,
} from './dto/update-question.dto';
import questionsJSON from '@db/questions.json';
import { QuestionsStore } from './questions.store';

const questions = plainToClass(Question, questionsJSON);
const options = {
  keys: [],
  threshold: 0.3,
};
const fuse = new Fuse(questions, options);

@Injectable()
export class QuestionService {
  private question: Question[] = questions;
  constructor(private readonly questionStore: QuestionsStore) {}

  findAllQuestions(paginate: GetQuestionDto) {
    return this.questionStore.findPaginate(paginate);
  }

  findAllQuestionsOld({
    limit,
    page,
    search,
    answer,
    product_id,
  }: GetQuestionDto) {
    if (!page) page = 1;
    if (!limit) limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Question[] = this.question;

    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        data = fuse.search(value)?.map(({ item }) => item);
      }
    }

    if (product_id) {
      data = data.filter((p) => p.product_id === Number(product_id));
    }

    const results = data.slice(startIndex, endIndex);
    const url = `/questions?search=${search}&answer=${answer}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  findQuestion(id: number) {
    return this.questionStore.findById(id);
  }

  create(createQuestionDto: CreateQuestionDto) {
    return this.questionStore.create(createQuestionDto);
  }

  update(id: number, updateQuestionDto: UpdateAnswerQuestionDto) {
    return this.questionStore.update(id, updateQuestionDto);
  }

  delete(id: number) {
    return this.questionStore.softDelete(id);
  }
}

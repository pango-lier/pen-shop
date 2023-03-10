import { PartialType, PickType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';
import { Question } from '../entities/question.entity';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}

export class UpdateAnswerQuestionDto extends PickType(Question, ['answer']) {}

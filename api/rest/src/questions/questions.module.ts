import { Module } from '@nestjs/common';
import { MyQuestionsController } from './my-questions.controller';
import { MyQuestionsService } from './my-questions.service';
import { QuestionController } from './questions.controller';
import { QuestionService } from './questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionsStore } from './questions.store';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionController, MyQuestionsController],
  providers: [QuestionService, MyQuestionsService, QuestionsStore],
})
export class QuestionModule {}

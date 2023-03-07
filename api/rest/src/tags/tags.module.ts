import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { TagsStore } from './tags.store';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagsStore],
  imports: [TypeOrmModule.forFeature([Tag])]
})
export class TagsModule { }

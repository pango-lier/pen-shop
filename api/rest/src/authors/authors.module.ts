import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController, TopAuthors } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { AuthorStore } from './authors.store';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorsController, TopAuthors],
  providers: [AuthorsService, AuthorStore],
})
export class AuthorsModule {}

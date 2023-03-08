import { PartialType, PickType } from '@nestjs/swagger';
import { CreateAuthorDto } from './create-author.dto';
import { Author } from '../entities/author.entity';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}

export class UpdateApprovalAuthorDto extends PickType(Author, [
  'is_approved',
]) {}

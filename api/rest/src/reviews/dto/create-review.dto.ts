import { OmitType } from '@nestjs/swagger';
import { Attachment } from '../../common/entities/attachment.entity';
import { Review } from '../entities/review.entity';

export class CreateReviewDto extends OmitType(Review, [
  'id',
  'created_at',
  'updated_at',
]) {}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { Type } from './type.entity';
import { Attachment } from '../../common/entities/attachment.entity';

export class Banner extends CoreEntity {
  title?: string;

  description?: string;

  type_id: number;

  image: Attachment;
}

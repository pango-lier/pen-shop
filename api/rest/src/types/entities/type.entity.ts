import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Attachment } from '../../common/entities/attachment.entity';
import { CoreEntity, CoreSoftEntity } from '../../common/entities/core.entity';
import { Banner } from './banner.entity';
import { Category } from '../../categories/entities/category.entity';

export class TypeSettings {
  isHome: boolean;
  layoutType: string;
  productCard: string;
}
@Entity()
export class Type extends CoreSoftEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'varchar' })
  icon: string;

  @Column({ type: 'json', nullable: true })
  banners?: Banner[];

  @Column({ type: 'json', nullable: true })
  promotional_sliders?: Attachment[];

  @Column({ type: 'json', nullable: true })
  settings?: TypeSettings;

  @Column({ type: 'varchar', length: 4 })
  language: string;

  @Column({ type: 'simple-array', nullable: true })
  translated_languages?: string[];

  @OneToMany(() => Category, (category) => category.type, { nullable: true })
  categories?: Category;
}

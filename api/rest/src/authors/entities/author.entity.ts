import { CoreEntity } from '../../common/entities/core.entity';
import { Attachment } from '../../common/entities/attachment.entity';
import { ShopSocials } from '../../settings/entities/setting.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class Author extends CoreEntity {
  @Column({ type: 'tinytext', nullable: true })
  bio?: string;

  @Column({ type: 'tinytext', nullable: true })
  born?: string;

  @OneToOne(() => Attachment, { nullable: true })
  cover_image?: Attachment;

  @Column({ type: 'tinytext', nullable: true })
  death?: string;

  @OneToOne(() => Attachment, { nullable: true })
  image?: Attachment;

  @Column({ type: 'boolean', nullable: true })
  is_approved?: boolean;

  @Column({ type: 'varchar', nullable: true })
  languages?: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'bigint', nullable: true })
  products_count?: number;

  @Column({ type: 'tinytext', nullable: true })
  quote?: string;

  @Column({ type: 'varchar', nullable: true })
  slug?: string;

  @Column({ type: 'json', nullable: true })
  socials?: ShopSocials;

  @Column({ type: 'varchar', length: 4, nullable: true })
  language?: string;

  @Column({ type: 'simple-array', nullable: true })
  translated_languages?: string[];
}

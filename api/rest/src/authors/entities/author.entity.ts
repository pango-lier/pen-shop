import { CoreEntity, CoreSoftEntity } from '../../common/entities/core.entity';
import { Attachment } from '../../common/entities/attachment.entity';
import { ShopSocials } from '../../settings/entities/setting.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Author extends CoreSoftEntity {
  @Column({ type: 'tinytext', nullable: true })
  bio?: string;

  @Column({ type: 'timestamp', nullable: true })
  born?: Date;

  @OneToOne(() => Attachment, { nullable: true, cascade: true })
  @JoinColumn({ name: 'cover_image_id' })
  cover_image?: Attachment;

  @Column({ type: 'timestamp', nullable: true })
  death?: Date;

  @OneToOne(() => Attachment, { nullable: true, cascade: true })
  @JoinColumn({ name: 'image_id' })
  image?: Attachment;

  @Column({ type: 'boolean', nullable: true, default: true })
  is_approved?: boolean;

  @Column({ type: 'varchar', nullable: true })
  languages?: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'bigint', nullable: true, default: 0 })
  products_count?: number;

  @Column({ type: 'tinytext', nullable: true })
  quote?: string;

  @Column({ type: 'varchar', nullable: true })
  slug?: string;

  @Column({ type: 'json', nullable: true })
  socials?: ShopSocials;

  @Column({ type: 'varchar', length: 4, nullable: true, default: 'en' })
  language?: string;

  @Column({ type: 'simple-array', nullable: true })
  translated_languages?: string[];
}

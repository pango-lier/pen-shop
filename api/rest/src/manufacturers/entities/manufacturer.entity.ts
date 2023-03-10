import { CoreEntity } from '../../common/entities/core.entity';
import { Attachment } from '../../common/entities/attachment.entity';
import { ShopSocials } from '../../settings/entities/setting.entity';
import { Type } from '../../types/entities/type.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Manufacturer extends CoreEntity {
  @ManyToOne(() => Attachment, { nullable: true, cascade: true })
  @JoinColumn({ name: 'cover_image_id' })
  cover_image?: Attachment;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @ManyToOne(() => Attachment, { nullable: true, cascade: true })
  @JoinColumn({ name: 'image_id' })
  image?: Attachment;

  @Column({ type: 'boolean', nullable: true })
  is_approved?: boolean;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'bigint', nullable: true })
  products_count?: number;

  @Column({ type: 'varchar', nullable: true })
  slug?: string;

  @Column({ type: 'json', nullable: true })
  socials?: ShopSocials;

  @ManyToOne(() => Type, { cascade: true })
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @Column({ type: 'bigint', unsigned: true })
  type_id: number;

  @Column({ type: 'varchar', nullable: true })
  website?: string;

  @Column({ type: 'varchar', length: 4, default: 'en' })
  language?: string;

  @Column({ type: 'simple-array', nullable: true })
  translated_languages?: string[];
}

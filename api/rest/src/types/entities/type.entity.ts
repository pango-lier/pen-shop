import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity, CoreSoftEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Banner extends CoreEntity {
  @Column({ type: 'varchar', nullable: true })
  title?: string;

  @Column({ type: 'tinytext', nullable: true })
  description?: string;

  @OneToOne(() => Attachment, { cascade: true })
  image: Attachment;
}

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

  @OneToOne(() => Attachment)
  image: Attachment;

  @Column({ type: 'varchar' })
  icon: string;

  @ManyToOne(() => Banner, { cascade: true })
  banners?: Banner[];

  @ManyToMany(() => Attachment)
  promotional_sliders?: Attachment[];

  @Column({ type: 'json', nullable: true })
  settings?: TypeSettings;

  @Column({ type: 'varchar', length: 4 })
  language: string;

  @Column({ type: 'simple-array', nullable: true })
  translated_languages?: string[];
}

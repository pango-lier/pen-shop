import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToMany, OneToMany, OneToOne } from 'typeorm';

export class Banner {
  id: number;
  title?: string;
  description?: string;
  image: Attachment;
}

export class TypeSettings {
  isHome: boolean;
  layoutType: string;
  productCard: string;
}
@Entity()
export class Type extends CoreEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @OneToOne(() => Attachment)
  image: Attachment;

  @Column({ type: 'varchar' })
  icon: string;

  @Column({ type: 'json', nullable: true })
  banners?: Banner[];

  @ManyToMany(() => Attachment)
  promotional_sliders?: Attachment[];

  @Column({ type: 'json', nullable: true })
  settings?: TypeSettings;

  @Column({ type: 'varchar', length: 4 })
  language: string;

  @Column({ type: 'simple-array' })
  translated_languages: string[];
}

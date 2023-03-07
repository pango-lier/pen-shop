import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity, CoreSoftEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { Type } from 'src/types/entities/type.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Tag extends CoreSoftEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  // @Column({ type: 'bigint' })
  // parent: number;

  @Column({ type: 'varchar' })
  details: string;

  @ManyToOne(() => Attachment, { nullable: true, cascade: true })
  @JoinColumn({ name: 'image_id' })
  image?: Attachment;

  @Column({ type: 'varchar' })
  icon: string;

  @Column({ type: 'bigint', unsigned: true })
  type_id: number;

  @ManyToOne(() => Type)
  @JoinColumn({ name: 'type_id' })
  type?: Type;

  @ManyToMany(() => Product)
  products: Product[];

  @Column({ type: 'varchar', length: 4 })
  language: string;

  @Column({ type: 'simple-array' })
  translated_languages: string[];
}

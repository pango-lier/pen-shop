import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { Type } from 'src/types/entities/type.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Category extends CoreEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @ManyToOne(() => Category, (parent) => parent.children, { nullable: true })
  parent?: Category;

  @OneToMany(() => Category, (category) => category.parent, { nullable: true })
  children?: Category[];

  @Column({ type: 'varchar', nullable: true })
  details?: string;

  @OneToOne(() => Attachment, { nullable: true })
  image?: Attachment;

  @Column({ type: 'varchar', nullable: true })
  icon?: string;

  type?: Type;
  products?: Product[];

  @Column({ type: 'varchar', length: 4 })
  language: string;

  @Column({ type: 'simple-array' })
  translated_languages: string[];
}

import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { Type } from 'src/types/entities/type.entity';
import { Column, Entity, ManyToMany, OneToOne } from 'typeorm';

@Entity()
export class Tag extends CoreEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'bigint' })
  parent: number;

  @Column({ type: 'varchar' })
  details: string;

  @OneToOne(() => Attachment)
  image: Attachment;

  @Column({ type: 'varchar' })
  icon: string;

  @OneToOne(() => Type)
  type: Type;

  @ManyToMany(() => Product)
  products: Product[];

  @Column({ type: 'varchar', length: 4 })
  language: string;

  @Column({ type: 'simple-array' })
  translated_languages: string[];
}

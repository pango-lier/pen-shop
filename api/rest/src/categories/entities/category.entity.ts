import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { Type } from 'src/types/entities/type.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Tree('closure-table', {
  closureTableName: 'category_closure',
  ancestorColumnName: (column) => 'ancestor_' + column.propertyName,
  descendantColumnName: (column) => 'descendant_' + column.propertyName,
})
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint' }) // close id
  id: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @TreeChildren({ cascade: true })
  children?: Category[];

  @TreeParent({ onDelete: 'CASCADE' })
  parent?: Category;

  @Column({ type: 'varchar', nullable: true })
  details?: string;

  //@OneToOne(() => Attachment, { nullable: true })
  @Column({ type: 'json', nullable: true })
  image?: Attachment;

  @Column({ type: 'varchar', nullable: true })
  icon?: string;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  type_id?: string;

  @ManyToOne(() => Type, (type) => type.categories, { nullable: true })
  @JoinColumn({ name: 'type_id' })
  type?: Type;

  products?: Product[];

  @Column({ type: 'varchar', length: 4 })
  language: string;

  @Column({ type: 'simple-array' })
  translated_languages: string[];
}

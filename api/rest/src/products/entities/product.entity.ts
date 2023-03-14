import { AttributeValue } from 'src/attributes/entities/attribute-value.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Type } from 'src/types/entities/type.entity';
import { Review } from '../../reviews/entities/review.entity';
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

export enum ProductStatus {
  PUBLISH = 'publish',
  DRAFT = 'draft',
}

export enum ProductType {
  SIMPLE = 'simple',
  VARIABLE = 'variable',
}

export class OrderProductPivot {
  variation_option_id?: number;
  order_quantity: number;
  unit_price: number;
  subtotal: number;
}

@Entity()
export class Variation extends CoreEntity {
  // id: number;
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'bigint' })
  price: number;

  @Column({ type: 'varchar' })
  sku: string;

  @Column({ type: 'boolean' })
  is_disable: boolean;

  @Column({ type: 'boolean', default: false })
  is_digital: boolean;

  @Column({ type: 'bigint', nullable: true })
  sale_price?: number;

  @Column({ type: 'bigint' })
  quantity: number;

  @Column({ type: 'json' })
  options: VariationOption[];
}

export class VariationOption {
  name: string;
  value: string;
}

@Entity()
export class File extends CoreEntity {
  @Column({ type: 'bigint', unsigned: true })
  attachment_id: number;

  @Column({ type: 'varchar', length: 2083 })
  url: string;

  @Column({ type: 'bigint', unsigned: true })
  fileable_id: number;
}

@Entity()
export class Product extends CoreEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'bigint', unsigned: true })
  type_id: number;

  @OneToOne(() => Type)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @Column({ type: 'enum', enum: ProductType })
  product_type: ProductType;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags?: Tag[];

  @ManyToMany(() => AttributeValue, { nullable: true, cascade: true })
  @JoinTable()
  variations?: AttributeValue[];

  @ManyToMany(() => Variation, { nullable: true, cascade: true })
  @JoinTable()
  variation_options?: Variation[];

  @Column({ type: 'json', nullable: true })
  pivot?: OrderProductPivot;

  @ManyToMany(() => Order, { nullable: true })
  @JoinTable()
  orders?: Order[];

  @Column({ type: 'bigint', unsigned: true })
  shop_id: number;

  @ManyToOne(() => Shop, { cascade: true })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @ManyToMany(() => Product, { nullable: true })
  @JoinTable()
  related_products?: Product[];

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'boolean', default: true })
  in_stock: boolean;

  @Column({ type: 'boolean', default: false })
  is_taxable: boolean;

  @Column({ type: 'bigint', nullable: true })
  sale_price?: number;

  @Column({ type: 'bigint', nullable: true })
  max_price?: number;

  @Column({ type: 'bigint', nullable: true })
  min_price?: number;

  @Column({ type: 'varchar', nullable: true })
  sku?: string;

  //@Column({ type: 'json', nullable: true })
  @ManyToMany(() => Attachment)
  @JoinTable()
  gallery?: Attachment[];

  @ManyToOne(() => Attachment)
  @JoinColumn({ name: 'image_id' })
  image?: Attachment;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.DRAFT })
  status: ProductStatus;

  @Column({ type: 'varchar', nullable: true })
  height?: string;

  @Column({ type: 'varchar', nullable: true })
  length?: string;

  @Column({ type: 'varchar', nullable: true })
  width?: string;

  @Column({ type: 'bigint', nullable: true })
  price?: number;

  @Column({ type: 'bigint', nullable: true })
  quantity: number;

  @Column({ type: 'varchar', nullable: true })
  unit?: string;

  @Column({ type: 'bigint', nullable: true })
  ratings?: number;

  @Column({ type: 'boolean', default: false })
  in_wishlist?: boolean;

  @OneToMany(() => Review, (review) => review.product, { nullable: true })
  my_review?: Review[];

  @Column({ type: 'varchar', length: 4, nullable: true })
  language?: string;

  @Column({ type: 'simple-array', nullable: true })
  translated_languages?: string[];
}

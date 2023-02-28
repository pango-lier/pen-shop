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
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

enum ProductStatus {
  PUBLISH = 'publish',
  DRAFT = 'draft',
}

enum ProductType {
  SIMPLE = 'simple',
  VARIABLE = 'variable',
}

export class OrderProductPivot {
  variation_option_id?: number;
  order_quantity: number;
  unit_price: number;
  subtotal: number;
}

export class Variation {
  id: number;
  title: string;
  price: number;
  sku: string;
  is_disable: boolean;
  sale_price?: number;
  quantity: number;
  options: VariationOption[];
}

export class VariationOption {
  name: string;
  value: string;
}

export class File extends CoreEntity {
  attachment_id: number;
  url: string;
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
  categories: Category[];

  @ManyToMany(() => Tag)
  tags?: Tag[];

  @ManyToMany(() => AttributeValue)
  variations?: AttributeValue[];

  @Column({ type: 'json', nullable: true })
  variation_options?: Variation[];

  @Column({ type: 'json', nullable: true })
  pivot?: OrderProductPivot;

  @ManyToMany(() => Order)
  orders?: Order[];

  @ManyToOne(() => Shop)
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @Column({ type: 'bigint', unsigned: true })
  shop_id: number;

  @ManyToMany(() => Product)
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
  gallery?: Attachment[];

  @OneToOne(() => Attachment)
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

  @Column({ type: 'varchar' })
  unit: string;

  @Column({ type: 'bigint' })
  ratings: number;

  @Column({ type: 'boolean' })
  in_wishlist: boolean;

  my_review?: Review[];

  @Column({ type: 'varchar', length: 4, nullable: true })
  language: string;

  @Column({ type: 'simple-array', nullable: true })
  translated_languages: string[];
}

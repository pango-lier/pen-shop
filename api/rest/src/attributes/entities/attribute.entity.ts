import { CoreEntity, CoreSoftEntity } from 'src/common/entities/core.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { AttributeValue } from './attribute-value.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Attribute extends CoreSoftEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'bigint', unsigned: true })
  shop_id: number;

  @ManyToOne(() => Shop, (shop) => shop.attributes)
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @Column({ type: 'varchar' })
  slug: string;

  @OneToMany(
    () => AttributeValue,
    (attributeValue) => attributeValue.attribute,
    { cascade: true },
  )
  values: AttributeValue[];

  @Column({ type: 'varchar', length: 4, default: 'en' })
  language: string;

  @Column({ type: 'simple-array', nullable: true })
  translated_languages?: string[];
}

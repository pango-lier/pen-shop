import { CoreEntity } from 'src/common/entities/core.entity';
import { Attribute } from './attribute.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class AttributeValue extends CoreEntity {
  @Column({ type: 'bigint', unsigned: true })
  shop_id: number;

  @Column({ type: 'varchar' })
  value: string;

  @Column({ type: 'varchar', nullable: true })
  meta?: string;

  @ManyToOne(() => Attribute, (v) => v.values)
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;
}

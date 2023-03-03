import { CoreEntity } from 'src/common/entities/core.entity';
import { Attribute } from './attribute.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class AttributeValue extends CoreEntity {
  @Column({ type: 'varchar', length: 4, default: 'en' })
  language: string;

  @Column({ type: 'varchar' })
  value: string;

  @Column({ type: 'varchar', nullable: true })
  meta?: string;

  @ManyToOne(() => Attribute, (v) => v.values, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;
}

import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class OrderStatus extends CoreEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  color: string;

  @Column({ type: 'bigint' })
  serial: number;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'varchar', length: 4, default: 'en' })
  language: string;

  @Column({ type: 'simple-array', nullable: true })
  translated_languages?: string[];
}

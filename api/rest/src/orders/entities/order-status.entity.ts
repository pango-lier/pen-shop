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

  @Column({ type: 'varchar' })
  language: string;

  @Column({ type: 'simple-array' })
  translated_languages: string[];
}

import { CoreEntity, CoreSoftEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Tax extends CoreSoftEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'bigint' })
  rate: number;

  @Column({ type: 'boolean', default: false })
  is_global: boolean;

  @Column({ type: 'varchar', nullable: true })
  country?: string;

  @Column({ type: 'varchar', nullable: true })
  state?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  zip?: string;

  @Column({ type: 'varchar', nullable: true })
  city?: string;

  @Column({ type: 'int', nullable: true })
  priority?: number;

  @Column({ type: 'boolean', default: false })
  on_shipping: boolean;
}

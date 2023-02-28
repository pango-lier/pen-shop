import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Feedback extends CoreEntity {
  @Column({ type: 'bigint', unsigned: true })
  user_id: number;

  @Column({ type: 'varchar' })
  model_type: string;

  @Column({ type: 'bigint', unsigned: true })
  model_id: number;

  @Column({ type: 'boolean', nullable: true })
  positive?: boolean;

  @Column({ type: 'boolean', nullable: true })
  negative?: boolean;
}

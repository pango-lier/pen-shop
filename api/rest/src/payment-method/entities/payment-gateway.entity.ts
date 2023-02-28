import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class PaymentGateWay extends CoreEntity {
  @Column({ type: 'bigint', unsigned: true })
  user_id: number;

  @Column({ type: 'bigint', unsigned: true })
  customer_id: string;

  @Column({ type: 'varchar' })
  gateway_name: string;
}

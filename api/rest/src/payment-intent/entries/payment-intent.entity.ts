import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';

export class PaymentIntentInfo {
  client_secret?: string | null;
  redirect_url?: string | null;
  payment_id: string;
  is_redirect: boolean;
}
@Entity()
export class PaymentIntent extends CoreEntity {
  //id: number;
  @Column({ type: 'bigint' })
  order_id: number;

  @Column({ type: 'varchar' })
  tracking_number: string;

  @Column({ type: 'varchar' })
  payment_gateway: string;

  @Column({ type: 'json' })
  payment_intent_info: PaymentIntentInfo;
}

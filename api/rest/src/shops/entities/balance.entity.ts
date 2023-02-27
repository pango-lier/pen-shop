import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { Shop } from './shop.entity';

export class PaymentInfo {
  account: string;
  name: string;
  email: string;
  bank: string;
}

@Entity()
export class Balance extends CoreEntity {
  //id: number;
  @Column({ type: 'bigint' })
  admin_commission_rate: number;

  @OneToOne(() => Shop)
  shop: Shop;

  @Column({ type: 'bigint' })
  total_earnings: number;

  @Column({ type: 'bigint' })
  withdrawn_amount: number;

  @Column({ type: 'bigint' })
  current_balance: number;

  @Column({ type: 'json' })
  payment_info: PaymentInfo;
}

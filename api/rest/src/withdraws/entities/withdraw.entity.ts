import { CoreEntity } from 'src/common/entities/core.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum WithdrawStatus {
  APPROVED = 'Approved',
  PENDING = 'Pending',
  ON_HOLD = 'On hold',
  REJECTED = 'Rejected',
  PROCESSING = 'Processing',
}

@Entity()
export class Withdraw extends CoreEntity {
  @Column({ type: 'bigint' })
  amount: number;

  @Column({
    type: 'enum',
    enum: WithdrawStatus,
    default: WithdrawStatus.APPROVED,
  })
  status: WithdrawStatus;

  @Column({ type: 'bigint', unsigned: true })
  shop_id: number;

  @ManyToOne(() => Shop)
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @Column({ type: 'varchar' })
  payment_method: string;

  @Column({ type: 'tinytext' })
  details: string;

  @Column({ type: 'tinytext' })
  note: string;
}

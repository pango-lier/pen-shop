import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity, CoreSoftEntity } from 'src/common/entities/core.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

export enum CouponType {
  FIXED_COUPON = 'fixed',
  PERCENTAGE_COUPON = 'percentage',
  FREE_SHIPPING_COUPON = 'free_shipping',
}

@Entity()
export class Coupon extends CoreSoftEntity {
  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'varchar' })
  minimum_cart_amount: number;

  @OneToMany(() => Order, (order) => order.coupon, { nullable: true })
  orders?: Order[];

  @Column({
    type: 'enum',
    enum: CouponType,
    default: CouponType.FIXED_COUPON,
  })
  type: CouponType;

  @OneToOne(() => Attachment, { cascade: true })
  @JoinColumn({ name: 'image_id' })
  image: Attachment;

  @Column({ type: 'boolean', default: true })
  is_valid: boolean;

  @Column({ type: 'bigint' })
  amount: number;

  @Column({ type: 'timestamp' })
  active_from: Date;

  @Column({ type: 'timestamp' })
  expire_at: Date;

  @Column({ type: 'varchar' })
  language: string;

  @Column({ type: 'simple-array', nullable: true })
  translated_languages: string[];
}

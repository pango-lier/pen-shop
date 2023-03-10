import { UserAddress } from 'src/addresses/entities/address.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { PaymentIntent } from 'src/payment-intent/entries/payment-intent.entity';
import { File, Product } from 'src/products/entities/product.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderStatus } from './order-status.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

export enum PaymentGatewayType {
  STRIPE = 'STRIPE',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  CASH = 'CASH',
  FULL_WALLET_PAYMENT = 'FULL_WALLET_PAYMENT',
  PAYPAL = 'PAYPAL',
  RAZORPAY = 'RAZORPAY',
}
export enum OrderStatusType {
  PENDING = 'order-pending',
  PROCESSING = 'order-processing',
  COMPLETED = 'order-completed',
  CANCELLED = 'order-cancelled',
  REFUNDED = 'order-refunded',
  FAILED = 'order-failed',
  AT_LOCAL_FACILITY = 'order-at-local-facility',
  OUT_FOR_DELIVERY = 'order-out-for-delivery',
  // DEFAULT_ORDER_STATUS = 'order-pending',
}

export enum PaymentStatusType {
  PENDING = 'payment-pending',
  PROCESSING = 'payment-processing',
  SUCCESS = 'payment-success',
  FAILED = 'payment-failed',
  REVERSAL = 'payment-reversal',
  CASH_ON_DELIVERY = 'payment-cash-on-delivery',
  CASH = 'payment-cash',
  WALLET = 'payment-wallet',
  AWAITING_FOR_APPROVAL = 'payment-awaiting-for-approval',
  //  DEFAULT_PAYMENT_STATUS = 'payment-pending',
}

@Entity()
export class Order extends CoreEntity {
  @Column({ type: 'varchar' })
  tracking_number: string;

  @Column({ type: 'bigint', unsigned: true })
  customer_id: number;

  @Column({ type: 'varchar' })
  customer_contact: string;

  @ManyToOne(() => User, (user) => user.orders)
  customer: User;

  @ManyToOne(() => Order, (order) => order.children)
  parent_order?: Order;

  @OneToMany(() => Order, (order) => order.parent_order)
  children: Order[];

  @OneToOne(() => OrderStatus)
  status: OrderStatus;

  @Column({
    type: 'enum',
    enum: OrderStatusType,
    default: OrderStatusType.PENDING,
  })
  order_status: OrderStatusType;

  @Column({
    type: 'enum',
    enum: PaymentStatusType,
    default: PaymentStatusType.PENDING,
  })
  payment_status: PaymentStatusType;

  @Column({ type: 'bigint' })
  amount: number;

  @Column({ type: 'bigint' })
  sales_tax: number;

  @Column({ type: 'bigint' })
  total: number;

  @Column({ type: 'bigint' })
  paid_total: number;

  @Column({ type: 'varchar', nullable: true })
  payment_id?: string;

  @Column({
    type: 'enum',
    enum: PaymentGatewayType,
    default: PaymentGatewayType.CASH,
  })
  payment_gateway: PaymentGatewayType;

  @ManyToOne(() => Coupon, { nullable: true })
  coupon?: Coupon;

  @ManyToOne(() => Shop)
  shop: Shop;

  @Column({ type: 'bigint' })
  discount?: number;

  @Column({ type: 'bigint', nullable: true })
  delivery_fee: number;

  @Column({ type: 'varchar' })
  delivery_time: string;

  @ManyToMany(() => Product, (product) => product.orders)
  products: Product[];

  @Column({ type: 'json' })
  billing_address: UserAddress;

  @Column({ type: 'json' })
  shipping_address: UserAddress;

  @Column({ type: 'varchar', length: 4, default: 'en' })
  language: string;

  @Column({ type: 'simple-array', nullable: true })
  translated_languages?: string[];

  @OneToOne(() => PaymentIntent)
  payment_intent: PaymentIntent;
}

@Entity()
export class OrderFiles extends CoreEntity {
  @Column({ type: 'varchar' })
  purchase_key: string;

  @Column({ type: 'bigint', unsigned: true })
  digital_file_id: number;

  @Column({ type: 'bigint', nullable: true })
  order_id?: number;

  @Column({ type: 'bigint', unsigned: true })
  customer_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'digital_file_id' })
  file: File;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'fileable_id' })
  fileable: Product;
}

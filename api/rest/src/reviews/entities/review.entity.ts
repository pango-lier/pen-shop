import { CoreEntity } from 'src/common/entities/core.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Attachment } from 'src/common/entities/attachment.entity';
import { Report } from './reports.entity';
import { Feedback } from 'src/feedbacks/entities/feedback.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Review extends CoreEntity {
  @Column({ type: 'bigint' })
  rating: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  comment: string;

  @ManyToOne(() => Shop)
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  customer: User;

  @ManyToMany(() => Attachment)
  photos: Attachment[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, (product) => product.my_review)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Feedback)
  @JoinColumn({ name: 'feedback_id' })
  feedbacks: Feedback[];

  @OneToOne(() => Feedback)
  my_feedback: Feedback;

  @Column({ type: 'bigint' })
  positive_feedbacks_count: number;

  @Column({ type: 'bigint' })
  negative_feedbacks_count: number;

  @Column({ type: 'bigint', unsigned: true })
  user_id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  order_id: number;

  @Column({ type: 'bigint', unsigned: true })
  product_id: number;

  @ManyToOne(() => Report)
  @JoinColumn({ name: 'report_id' })
  abusive_reports: Report[];

  @Column({ type: 'bigint', unsigned: true })
  shop_id: number;

  @Column({ type: 'varchar' })
  variation_option_id: string;

  @Column({ type: 'bigint', nullable: true })
  abusive_reports_count?: number;
}

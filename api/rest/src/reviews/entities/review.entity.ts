import { CoreEntity, CoreSoftEntity } from 'src/common/entities/core.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Attachment } from 'src/common/entities/attachment.entity';
import { Report } from './reports.entity';
import { Feedback } from 'src/feedbacks/entities/feedback.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Review extends CoreSoftEntity {
  @Column({ type: 'bigint' })
  rating: number;

  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'varchar' })
  comment: string;

  @Column({ type: 'bigint', unsigned: true })
  shop_id: number;

  @ManyToOne(() => Shop)
  @JoinColumn({ name: 'shop_id' })
  shop?: Shop;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  order_id: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order?: Order;

  @Column({ type: 'bigint', unsigned: true })
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' }) //customer
  user?: User;

  @Column({ type: 'bigint', unsigned: true })
  product_id: number;

  @ManyToOne(() => Product, (product) => product.my_review)
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @ManyToMany(() => Attachment, { nullable: true, cascade: true })
  @JoinTable()
  photos?: Attachment[];

  // @OneToMany(() => Feedback, (feedback) => feedback.review, {
  //   nullable: true,
  // })
  // feedbacks?: Feedback[];

  @OneToOne(() => Feedback)
  @JoinColumn({ name: 'my_feedback_id' })
  my_feedback?: Feedback;

  @Column({ type: 'bigint', nullable: true })
  positive_feedbacks_count: number;

  @Column({ type: 'bigint', nullable: true })
  negative_feedbacks_count: number;

  @OneToMany(() => Report, (report) => report.review, { nullable: true })
  abusive_reports: Report[];

  @Column({ type: 'varchar', nullable: true })
  variation_option_id: string;

  @Column({ type: 'bigint', nullable: true })
  abusive_reports_count?: number;
}

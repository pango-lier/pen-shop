import { CoreEntity, CoreSoftEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Feedback } from '../../feedbacks/entities/feedback.entity';
import { Shop } from '../../shops/entities/shop.entity';

@Entity()
export class Question extends CoreSoftEntity {
  @Column({ type: 'tinytext', nullable: true })
  question?: string;

  @Column({ type: 'tinytext' })
  answer: string;

  @Column({ type: 'bigint', default: 0 })
  positive_feedbacks_count?: number;

  @Column({ type: 'bigint', default: 0 })
  negative_feedbacks_count?: number;

  @Column({ type: 'bigint', default: 0 })
  abusive_reports_count?: number;

  @Column({ type: 'bigint', unsigned: true })
  user_id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  product_id?: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  shop_id?: number;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @ManyToOne(() => Shop, { nullable: true })
  @JoinColumn({ name: 'shop_id' })
  shop?: Shop;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Feedback, (feedback) => feedback.question, {
    nullable: true,
  })
  feedbacks?: Feedback[];

  @OneToOne(() => Feedback, { nullable: true })
  @JoinColumn({ name: 'my_feedback_id' })
  my_feedback?: Feedback;
}

import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Feedback } from '../../feedbacks/entities/feedback.entity';
import { Shop } from '../../shops/entities/shop.entity';

export class Question extends CoreEntity {
  @Column({ type: 'bigint', unsigned: true })
  user_id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  product_id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  shop_id: number;

  @Column({ type: 'tinytext', nullable: true })
  question?: string;

  @Column({ type: 'tinytext' })
  answer: string;

  @Column({ type: 'bigint', nullable: true })
  positive_feedbacks_count?: number;

  @Column({ type: 'bigint', nullable: true })
  negative_feedbacks_count?: number;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @ManyToOne(() => Shop, { nullable: true })
  @JoinColumn({ name: 'shop_id' })
  shop?: Shop;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // @OneToMany(() => Feedback, { nullable: true })
  // feedbacks?: Feedback[];

  @OneToOne(() => Feedback, { nullable: true })
  @JoinColumn({ name: 'my_feedback_id' })
  my_feedback?: Feedback;
}

import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { Feedback } from '../../feedbacks/entities/feedback.entity';

export class Question extends CoreEntity {

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'bigint' })
  product_id: number;

  @Column({ type: 'bigint' })
  shop_id: number;

  @Column({ type: 'tinytext', nullable: true })
  question?: string;

  @Column({ type: 'tinytext' })
  answer: string;

  @Column({ type: 'bigint', nullable: true })
  positive_feedbacks_count?: number;

  @Column({ type: 'bigint', nullable: true })
  negative_feedbacks_count?: number;
  product: Product;

  @ManyToOne(() => User)
  user: User;

  @ManyToMany(() => Feedback, { nullable: true })
  feedbacks?: Feedback[];

  @OneToOne(() => Feedback, { nullable: true })
  my_feedback?: Feedback;
}

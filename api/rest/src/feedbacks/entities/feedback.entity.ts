import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';
import { User } from '../../users/entities/user.entity';
import { Question } from '../../questions/entities/question.entity';

@Entity()
@Index(['model_type', 'model_id'])
export class Feedback extends CoreEntity {
  @Column({ type: 'bigint', unsigned: true })
  user_id: number;

  @Column({ type: 'varchar' })
  model_type: string;

  @Column({ type: 'bigint', unsigned: true })
  model_id: number;

  @Column({ type: 'boolean', nullable: true })
  positive?: boolean;

  @Column({ type: 'boolean', nullable: true })
  negative?: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Question, (question) => question.feedbacks, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'model_id' })
  question: Question;
}

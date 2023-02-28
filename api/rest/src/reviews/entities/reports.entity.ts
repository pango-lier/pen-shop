import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Report extends CoreEntity {
  @Column({type:'bigint',unsigned:true})
  user_id?: number;

  @ManyToOne(()=>User)
  user: User[];

  @Column({ type: 'varchar' })
  model_type: string;
 
  @Column({ type: 'bigint', unsigned: true })
  model_id: number;

  @Column({type:'tinytext'})
  message: string;
}

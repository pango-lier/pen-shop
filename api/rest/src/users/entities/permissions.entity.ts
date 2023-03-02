import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Permission extends CoreEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', default: 'api' })
  guard_name: string;

  @Column({ type: 'varchar', nullable: true })
  displayName?: string;

  @ManyToMany(() => User, (user) => user.permissions, { nullable: true })
  users?: User[];
}

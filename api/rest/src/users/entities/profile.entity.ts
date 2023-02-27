import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';


@Entity()
export class Profile extends CoreEntity {

  @OneToOne(() => Attachment)
  avatar?: Attachment;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'json', nullable: true })
  socials?: Social[];

  @Column({ type: 'varchar', nullable: true })
  contact?: string;

  @OneToOne(() => User)
  customer?: User;
}

export class Social {
  type: string;
  link: string;
}

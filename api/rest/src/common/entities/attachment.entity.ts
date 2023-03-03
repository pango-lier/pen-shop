import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm';
import { CoreEntity } from './core.entity';

@Entity()
export class Attachment extends CoreEntity {
  @Column({ type: 'varchar', length: 2083, nullable: true })
  thumbnail?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  original?: string;
}

import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Attachment extends CoreEntity {
  @Column({ type: 'varchar', length: 2083, nullable: true })
  thumbnail?: string;

  @Column({ type: 'varchar', length: 2083, nullable: true })
  original?: string;
}

import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class MyReports extends CoreEntity {
  @Column({ type: 'varchar' })
  message: string;
}

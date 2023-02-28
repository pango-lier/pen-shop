import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Analytics extends CoreEntity {
  @Column({ type: 'bigint', nullable: true })
  totalRevenue?: number;

  @Column({ type: 'bigint', nullable: true })
  totalShops?: number;

  @Column({ type: 'bigint', nullable: true })
  todaysRevenue?: number;

  @Column({ type: 'bigint', nullable: true })
  totalOrders?: number;

  @Column({ type: 'bigint', nullable: true })
  newCustomers?: number;

  @Column({ type: 'json', nullable: true })
  totalYearSaleByMonth?: TotalYearSaleByMonth[];
}

export class TotalYearSaleByMonth {
  total?: number;
  month?: string;
}
 
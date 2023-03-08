import { CoreEntity, CoreSoftEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

export enum ShippingType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  FREE = 'free',
}

@Entity()
export class Shipping extends CoreSoftEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'bigint' })
  amount: number;

  @Column({ type: 'boolean', default: true })
  is_global: boolean;

  @Column({ type: 'enum', enum: ShippingType, default: ShippingType.FIXED })
  type: ShippingType;
}

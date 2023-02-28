import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

export enum ShippingType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  FREE = 'free',
}

@Entity()
export class Shipping extends CoreEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'bigint' })
  amount: number;

  @Column({ type: 'boolean' })
  is_global: boolean;

  @Column({ type: 'enum', enum: ShippingType, default: ShippingType.FIXED })
  type: ShippingType;
}



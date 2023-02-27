import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

export enum AddressType {
  BILLING = 'billing',
  SHIPPING = 'shipping',
}

export class UserAddress {
  street_address: string;
  country: string;
  city: string;
  state: string;
  zip: string;
}

@Entity()
export class Address extends CoreEntity {
  @Column({ type: 'varchar' }) 
  title: string;

  @Column({ type: 'boolean', default: true })
  default: boolean;

  @Column({ type: 'json' })
  address: UserAddress;

  @Column({ type: 'enum', enum: AddressType, default: AddressType.BILLING })
  type: AddressType;

  @ManyToOne(() => User, (user) => user.address)
  customer: User;
}


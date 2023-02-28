import { Address } from 'src/addresses/entities/address.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
// import { Order } from 'src/orders/entities/order.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class User extends CoreEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password?: string;

  @Column({ type: 'bigint', nullable: true, unsigned: true })
  shop_id?: number;

  @OneToOne(() => Profile, { nullable: true })
  profile?: Profile;

  @OneToMany(() => Shop, (shop) => shop.owner, { nullable: true })
  shops?: Shop[];

  @ManyToOne(() => Shop, (shop) => shop.staffs, { nullable: true })
  @JoinColumn({ name: 'shop_id' })
  managed_shop?: Shop;

  @Column({ type: 'boolean', default: true })
  is_active?: boolean = true;

  @OneToMany(() => Address, (address) => address.customer, { nullable: true })
  address?: Address[];

  @OneToMany(() => Order, (order) => order.customer, { nullable: true })
  orders?: Order[];
}

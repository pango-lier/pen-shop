import { Address } from 'src/addresses/entities/address.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
// import { Order } from 'src/orders/entities/order.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Order } from '../../orders/entities/order.entity';
import { Exclude } from 'class-transformer';
import { Permission } from './permissions.entity';

@Entity()
export class User extends CoreEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  username: string;

  @Column({ type: 'varchar' })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  password?: string;

  @Exclude()
  @Column({ length: 100, nullable: true })
  rememberToken?: string;

  @Exclude()
  @Column({ nullable: true })
  refreshToken?: string;

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

  @ManyToMany(() => Permission, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  permissions?: Permission[];

  constructor(partial?: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}

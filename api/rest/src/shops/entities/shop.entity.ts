import { UserAddress } from 'src/addresses/entities/address.entity';
import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity, CoreSoftEntity } from 'src/common/entities/core.entity';
import { Location, ShopSocials } from 'src/settings/entities/setting.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Balance } from './balance.entity';
import { Attribute } from '../../attributes/entities/attribute.entity';

export class ShopSettings {
  socials: ShopSocials[];
  contact: string;
  location: Location;
  website: string;
}

@Entity()
export class Shop extends CoreSoftEntity {
  @Column({ type: 'bigint', unsigned: true })
  owner_id: number;

  @ManyToOne(() => User, (user) => user.shops, { nullable: true })
  @JoinColumn({ name: 'owner_id' })
  owner?: User;

  @OneToMany(() => User, (user) => user.managed_shop, { nullable: true })
  staffs?: User[];

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'bigint', default: 0 })
  orders_count: number;

  @Column({ type: 'bigint', default: 0 })
  products_count: number;

  @OneToOne(() => Balance, { nullable: true })
  balance?: Balance;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToOne(() => Attachment)
  cover_image: Attachment;

  @OneToOne(() => Attachment, { nullable: true })
  logo?: Attachment;

  @Column({ type: 'json' })
  address: UserAddress;

  @Column({ type: 'json', nullable: true })
  settings?: ShopSettings;

  @OneToMany(() => Attribute, (attribute) => attribute.shop, { nullable: true })
  attributes?: Attribute[];
}

import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Wishlist extends CoreEntity {

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'bigint', unsigned: true })
  product_id: string;

  @ManyToMany(() => User)
  user: User[];

  @Column({ type: 'bigint', unsigned: true })
  user_id: number;
}

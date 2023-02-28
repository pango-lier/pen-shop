import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, OneToOne } from 'typeorm';
import { PaymentGateWay } from './payment-gateway.entity';

export class PaymentMethod extends CoreEntity {
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar' })
  method_key: string;
  @IsOptional()
  @IsBoolean()
  @Column({ type: 'boolean' })
  default_card: boolean;

  @Column({ type: 'bigint', nullable: true })
  payment_gateway_id?: number;

  @Column({ type: 'varchar', nullable: true })
  fingerprint?: string;

  @Column({ type: 'varchar', nullable: true })
  owner_name?: string;

  @Column({ type: 'varchar', nullable: true })
  network?: string;

  @Column({ type: 'varchar', nullable: true })
  type?: string;

  @Column({ type: 'varchar', nullable: true })
  last4?: string;

  @Column({ type: 'varchar', nullable: true })
  expires?: string;

  @Column({ type: 'varchar', nullable: true })
  origin?: string;

  @Column({ type: 'varchar', nullable: true })
  verification_check?: string;

  @OneToOne(() => PaymentGateWay, { nullable: true })
  payment_gateways?: PaymentGateWay;
}

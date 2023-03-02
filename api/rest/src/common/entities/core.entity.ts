import { Type } from 'class-transformer';
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class CoreEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Type(() => Date)
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Type(() => Date)
  updated_at?: Date;
}


export class CoreSoftEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Type(() => Date)
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Type(() => Date)
  updated_at?: Date;


  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  @Type(() => Date)
  deleted_at?: Date;
}

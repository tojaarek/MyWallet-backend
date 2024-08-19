import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Account } from './accounts.entity';

@Entity({ name: 'transactions' })
@Unique(['id'])
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  type: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column('numeric')
  value: number;

  @Column()
  currency: string;

  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn({ name: 'accountId' })
  account: Partial<Account>;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Transaction } from './transactions.entity';
import { User } from './users.entity';

@Entity({ name: 'accounts' })
@Unique(['id'])
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.accounts)
  @JoinColumn({ name: 'userId' })
  user: Partial<User>;

  @Column({ default: 0.0 })
  balance: number;

  @Column({ default: 'EUR' })
  currency: string;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}

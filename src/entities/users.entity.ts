import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { Account } from './accounts.entity';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
@Unique(['email', 'id'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: null, nullable: true })
  token: string | null;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}

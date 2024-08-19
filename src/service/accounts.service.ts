import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from 'src/entities/accounts.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async createAccount(newAccount: Partial<Account>): Promise<Account> {
    const account = this.accountRepository.create(newAccount);
    return await this.accountRepository.save(account);
  }

  async findAccount(id: number): Promise<Account | undefined> {
    return await this.accountRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async findAccountsByUserId(
    userId: number,
  ): Promise<{ id: number; balance: number; currency: string }[]> {
    const accounts = await this.accountRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    return accounts.map(({ id, balance, currency }) => ({
      id,
      balance,
      currency,
    }));
  }

  async findMainAccountByUserId(
    userId: number,
  ): Promise<{ id: number; balance: number; currency: string } | undefined> {
    const account = await this.accountRepository.findOne({
      where: { user: { id: userId }, currency: 'EUR' },
      relations: ['user'],
    });

    return {
      id: account.id,
      balance: account.balance,
      currency: account.currency,
    };
  }

  async updateBalance(
    id: number,
    newBalance: Partial<Account>,
  ): Promise<Account> {
    await this.accountRepository.update(id, newBalance);
    return await this.accountRepository.findOne({ where: { id } });
  }
}

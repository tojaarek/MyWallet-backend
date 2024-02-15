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

  async updateBalance(
    id: number,
    newBalance: Partial<Account>,
  ): Promise<Account> {
    await this.accountRepository.update(id, newBalance);
    return await this.accountRepository.findOne({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from 'src/entities/transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async createTransaction(
    newTransaction: Partial<Transaction>,
  ): Promise<Transaction> {
    const transaction = this.transactionsRepository.create(newTransaction);
    return await this.transactionsRepository.save(transaction);
  }

  async findTransaction(transactionId: number): Promise<Transaction> {
    return await this.transactionsRepository.findOne({
      where: { id: transactionId },
      relations: ['account', 'account.user'],
    });
  }

  async findUserTransactions(accountId: number): Promise<Transaction[]> {
    return await this.transactionsRepository.find({
      where: { account: { id: accountId } },
      relations: ['account', 'account.user'],
    });
  }

  async deleteTransaction(transaction: Transaction): Promise<Transaction> {
    return await this.transactionsRepository.remove(transaction);
  }
}

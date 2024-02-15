import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { TransactionsController } from 'src/controllers/transaction.controller';
import { Account } from 'src/entities/accounts.entity';
import { Transaction } from 'src/entities/transactions.entity';
import { AccountsService } from 'src/service/accounts.service';
import { TransactionsService } from 'src/service/transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Account])],
  providers: [TransactionsService, AccountsService, JwtStrategy],
  controllers: [TransactionsController],
  exports: [TransactionsService],
})
export class TransactionModule {}

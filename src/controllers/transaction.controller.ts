import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Res,
  Param,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Account } from 'src/entities/accounts.entity';
import { Transaction } from 'src/entities/transactions.entity';
import { AccountsService } from 'src/service/accounts.service';
import { TransactionsService } from 'src/service/transactions.service';
import { TransactionDto } from 'src/validators/transactionDto';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly accountsService: AccountsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addTransaction(
    @Request() req,
    @Res() res,
    @Body() transactionDto: TransactionDto,
  ) {
    try {
      const checkAccount: Account = await this.accountsService.findAccount(
        transactionDto.account.id,
      );

      if (!checkAccount) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Not Found',
        });
      }

      if (checkAccount.user.id !== req.user.userId) {
        return res.status(403).json({
          status: 'error',
          code: 403,
          message: 'Forbidden',
        });
      }

      const {
        id,
        date,
        type,
        category,
        description,
        value,
        currency,
        account,
      } = await this.transactionsService.createTransaction(transactionDto);

      let newBalance: number;
      const balance = Number(checkAccount.balance);
      const transactionValue = Number(value);

      switch (type) {
        case 'income':
          newBalance = balance + transactionValue;
          break;
        case 'expense':
          newBalance = balance - transactionValue;
          break;
        default:
          throw new Error('Invalid transaction type');
      }

      newBalance = parseFloat(newBalance.toFixed(2));

      const updateBalance: Account = await this.accountsService.updateBalance(
        checkAccount.id,
        { balance: newBalance },
      );

      return res.status(201).json({
        status: 'success',
        code: 201,
        message: 'Transaction created',
        transaction: {
          id,
          date,
          type,
          category,
          description,
          value,
          currency,
          accountId: account.id,
          accountBalance: updateBalance.balance,
        },
      });
    } catch (error) {
      console.error('/transactions/add', error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':transactionId')
  async deleteTransaction(
    @Param('transactionId') transactionId: string,
    @Request() req,
    @Res() res,
  ) {
    try {
      const parsedTransactionId: number = parseInt(transactionId);
      const transaction: Transaction =
        await this.transactionsService.findTransaction(parsedTransactionId);

      if (!transaction) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Not Found',
        });
      }

      const accountOwner: number = transaction.account.user.id;

      if (accountOwner !== req.user.userId) {
        return res.status(403).json({
          status: 'error',
          code: 403,
          message: 'Forbidden',
        });
      }

      await this.transactionsService.deleteTransaction(transaction);

      let newBalance: number;
      const accountBalance = Number(transaction.account.balance);
      const transactionValue = Number(transaction.value);

      switch (transaction.type) {
        case 'income':
          newBalance = accountBalance - transactionValue;
          break;
        case 'expense':
          newBalance = accountBalance + transactionValue;
          break;
      }

      const accountId: number = transaction.account.id;

      newBalance = parseFloat(newBalance.toFixed(2));

      const updateBalance: Account = await this.accountsService.updateBalance(
        accountId,
        { balance: newBalance },
      );

      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Transaction deleted',
        account: {
          accountId,
          accountBalance: updateBalance.balance,
        },
      });
    } catch (error) {
      console.error('/transactions/delete', error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':accountId')
  async getUserTransactions(
    @Param('accountId') accountId: string,
    @Request() req,
    @Res() res,
  ) {
    try {
      const parsedAccountId = parseInt(accountId);
      const transactions =
        await this.transactionsService.findUserTransactions(parsedAccountId);

      if (transactions.length === 0) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Not Found',
        });
      }

      const accountOwner: number = transactions[0].account.user.id;

      if (accountOwner !== req.user.userId) {
        return res.status(403).json({
          status: 'error',
          code: 403,
          message: 'Forbidden',
        });
      }

      const response = transactions.map(
        ({ id, date, type, category, description, value }) => ({
          id,
          date,
          type,
          category,
          description,
          value,
        }),
      );

      return res.status(200).json({
        status: 'success',
        code: 200,
        transactions: response,
      });
    } catch (error) {
      console.error('/transactions/get', error.message);
    }
  }
}

import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { SignInDto } from 'src/validators/signInDto';
import { AuthService } from './auth.service';
import { AccountsService } from 'src/service/accounts.service';
import { TransactionsService } from 'src/service/transactions.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private accountsService: AccountsService,
    private transactionsService: TransactionsService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signInHandler(@Body() signInDto: SignInDto) {
    try {
      const { id, name, email, token } = await this.authService.signIn(
        signInDto.email,
        signInDto.password,
      );

      const mainAccount =
        await this.accountsService.findMainAccountByUserId(id);

      const mainAccountTransactions =
        await this.transactionsService.findUserTransactions(mainAccount.id);

      const userAccounts = await this.accountsService.findAccountsByUserId(id);

      return {
        status: 'OK',
        code: 200,
        user: {
          id,
          name,
          email,
          token,
        },
        mainAccount: {
          id: mainAccount.id,
          balance: mainAccount.balance,
          currency: mainAccount.currency,
          transactions: mainAccountTransactions,
        },
        userAccounts,
      };
    } catch (error) {
      console.error('/auth/login', error.message);
    }
  }
}

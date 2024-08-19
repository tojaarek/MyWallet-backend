import {
  Controller,
  Get,
  UseGuards,
  Request,
  Res,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Account } from 'src/entities/accounts.entity';
import { AccountsService } from 'src/service/accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getAccount(
    @Param('userId') userId: string,
    @Request() req,
    @Res() res,
  ) {
    try {
      const parsedUserId: number = parseInt(userId);

      return res.status(200).json({
        status: 'OK',
        code: 200,
        message: 'User accounts',
      });
    } catch (error) {
      console.error('/transactions/add', error.message);
    }
  }
}

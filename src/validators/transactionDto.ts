import { IsNotEmpty } from 'class-validator';
import { Account } from 'src/entities/accounts.entity';

export class TransactionDto {
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  account: Partial<Account>;
}

import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { Column } from 'typeorm';
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
  currency: string;

  @IsNotEmpty()
  account: Partial<Account>;
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/accounts.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AccountsService } from 'src/service/accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountsService, JwtStrategy],
  controllers: [],
  exports: [AccountsService],
})
export class AccountModule {}

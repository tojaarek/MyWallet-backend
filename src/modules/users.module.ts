import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { UsersService } from 'src/service/users.service';
import { UserController } from 'src/controllers/users.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AccountsService } from 'src/service/accounts.service';
import { Account } from 'src/entities/accounts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Account])],
  providers: [UsersService, AccountsService, JwtStrategy],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}

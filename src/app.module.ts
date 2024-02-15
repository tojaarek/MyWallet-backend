import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AccountModule } from './modules/accounts.module';
import { TransactionModule } from './modules/transactions.module';
import { CategoryModule } from './modules/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...require('../ormconfig'),
    }),
    UsersModule,
    TransactionModule,
    AccountModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}

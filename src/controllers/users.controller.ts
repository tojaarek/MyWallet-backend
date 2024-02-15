// user.controller.ts
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Get,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { UsersService } from 'src/service/users.service';
import { RegisterDto } from 'src/validators/registerDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/entities/users.entity';
import { AccountsService } from 'src/service/accounts.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly accountsService: AccountsService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const { id, name, email } =
        await this.userService.createUser(registerDto);

      await this.accountsService.createAccount({
        user: { id },
      });

      return {
        status: 'success',
        code: 201,
        message: 'User created',
        user: {
          id: id,
          name: name,
          email: email,
        },
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(
          {
            status: 'conflict',
            code: 409,
            message: 'This email address is already in use',
          },
          HttpStatus.CONFLICT,
        );
      }
      console.error(error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  async getCurrentHandler(@Request() req, @Res() res) {
    try {
      const tokenWithBearer: string = req.get('Authorization');
      const jwtToken: string = tokenWithBearer
        ? tokenWithBearer.split(' ')[1]
        : null;
      const user: User = await this.userService.findUser('token', jwtToken);

      if (!user) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          message: 'Unauthorized',
        });
      }
      return res.status(200).json({
        status: 'success',
        code: 200,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('current', error.message);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOutHandler(@Request() req, @Res() res) {
    try {
      const id: number = req.user.userId;
      const user: User = await this.userService.updateUser(id, { token: null });

      if (!user.token) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          message: 'Unauthorized',
        });
      }

      return res.status(204).json({
        status: 'OK',
        code: 204,
        message: 'No content',
      });
    } catch (error) {
      console.error('/auth/logout', error);
    }
  }
}

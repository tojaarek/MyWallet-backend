import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user: User = await this.usersService.findUser('email', email);
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    const token: string = await this.jwtService.signAsync(payload);
    return await this.usersService.updateUser(user.id, { token });
  }
}

import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { SignInDto } from 'src/validators/signInDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signInHandler(@Body() signInDto: SignInDto) {
    try {
      const { id, name, email, token } = await this.authService.signIn(
        signInDto.email,
        signInDto.password,
      );
      return {
        status: 'OK',
        code: 200,
        user: {
          id,
          name,
          email,
          token,
        },
      };
    } catch (error) {
      console.error('/auth/login', error.message);
    }
  }
}

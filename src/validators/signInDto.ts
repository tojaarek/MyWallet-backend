import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&])[A-Za-z\d!@#$%&]*$/, {
    message:
      'Password must contain at least 6 characters, one uppercase letter, one digit, and one special character !@#$%&',
  })
  password: string;
}

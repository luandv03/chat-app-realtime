import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  @IsNotEmpty()
  @Length(8, 20)
  confirmPassword: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.authService.register(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return await this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Req() req: any): Promise<any> {
    await this.authService.logout(req.user);

    return {
      statusCode: 200,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req: any): any {
    return req.user;
  }

  @Post('/refresh_token')
  async refresh(@Body('refreshToken') refreshToken: string): Promise<any> {
    return await this.authService.refreshToken(refreshToken);
  }
}

import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { Express, Response } from 'express';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UseInterceptors(FileInterceptor('avatar'))
  async register(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ): Promise<any> {
    return await this.authService.register(createUserDto, avatar);
  }

  @Post('/login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const data = await this.authService.login(loginUserDto);
    const secretData = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return data;
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
  async refresh(
    @Body('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const data = await this.authService.refreshToken(refreshToken);
    const secretData = {
      accessToken: data.accessToken,
      refreshToken,
    };
    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return data;
  }
}

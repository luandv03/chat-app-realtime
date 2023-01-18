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
import { Express, Response, Request } from 'express';
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
  async logout(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    await this.authService.logout(req.user);
    const secretData = {
      accessToken: null,
      refreshToken: null,
    };
    res.cookie('auth-cookie', secretData, { httpOnly: true });

    return {
      statusCode: 200,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req: any): any {
    return req.user;
  }

  @Get('/refresh_token')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    // Get refresh from cookies
    const authCookie = request?.cookies['auth-cookie'];

    //Refresh token to get access token
    const data = await this.authService.refreshToken(authCookie.refreshToken);

    //Update accessToken to cookies
    const secretData = {
      accessToken: data.accessToken,
      refreshToken: authCookie.refreshToken,
    };
    res.cookie('auth-cookie', secretData, { httpOnly: true });

    return data;
  }
}

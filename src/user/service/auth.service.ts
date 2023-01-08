import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { UserService } from './user.service';
import { jwtConstrant } from '../constrant/jwt.constrant';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.create(createUserDto);
    const token = await this._createToken(user.email);

    return {
      email: user.email,
      ...token,
    };
  }

  async login(payload: LoginUserDto): Promise<any> {
    const user = await this.userService.findByLogin(payload);
    const token = await this._createToken(user.email);

    return {
      email: user.email,
      ...token,
    };
  }

  // 5/1/2023
  //chưa an toàn vì khi refresh token bị xóa nhưng access token chưa hết hạn thì vẫn truy cập
  //được hệ thống thông qua access token đó
  // Cần fix thêm

  // 6/1/2023: đã fix được ở hàm validate() bên dưới
  async logout(user: any) {
    await this.userService.update(
      { email: user.email },
      { refreshToken: null },
    );
  }

  async validate(email: string): Promise<any> {
    const user = await this.userService.findByEmail(email, '-password');

    if (!user) {
      throw new HttpException('Invalid token!', HttpStatus.UNAUTHORIZED);
    }

    // giải quyết trường hợp: khi logout mà refresh token bị xóa nhưng access token vẫn còn hạn
    // nên vẫn vào được các router cần access token nên ta phải check refresh token ở đoạn này nữa
    if (!user.refreshToken) {
      throw new HttpException(
        'Invalid refresh token!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  private async _createToken(email: string, refresh = true): Promise<any> {
    //refresh : true --> (dùng cho trường hợp đăng nhập, đăng ký , lúc này refesh token sẽ tạo mới)
    if (refresh) {
      const accessToken = this.jwtService.sign({ email });
      const refreshToken = this.jwtService.sign(
        { email },
        {
          expiresIn: jwtConstrant.EXPIRES_IN_REFRESH,
          secret: jwtConstrant.SECRET_KEY_REFRESH,
        },
      );

      await this.userService.update({ email }, { refreshToken });

      return {
        accessToken,
        refreshToken,
        expiresIn: jwtConstrant.EXPIRES_IN,
        expiresIn_Refresh: jwtConstrant.EXPIRES_IN_REFRESH,
      };
    } else {
      // refresh: false (dùng cho trường hợp refesh token (access token hết hạn) thì sẽ cần lấy access token mới)
      const accessToken = this.jwtService.sign({ email });
      return {
        accessToken,
        expiresIn: jwtConstrant.EXPIRES_IN,
      };
    }
  }

  async refreshToken(refresh_token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: jwtConstrant.SECRET_KEY_REFRESH,
      });

      const user = await this.userService.getUserByRefesh(
        refresh_token,
        payload.email,
      );

      const token = await this._createToken(user.email, false);

      return {
        ...token,
      };
    } catch (e) {
      throw new HttpException('Invalid token!', HttpStatus.UNAUTHORIZED);
    }
  }
}

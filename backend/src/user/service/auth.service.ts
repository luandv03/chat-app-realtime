import { UserChangePasswordDto } from './../dto/user.dto';
import { OtpRepository } from './../repositories/otp.repository';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Express } from 'express';
import { ConfigService } from '@nestjs/config';
import * as speakeasy from 'speakeasy';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { UserService } from './user.service';
import { jwtConstrant } from '../constrant/jwt.constrant';
import { MailService } from 'src/mail/mail.service';
import { IResponse } from 'src/common/response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly otpRepository: OtpRepository,
    private readonly mailService: MailService,
  ) {}

  async register(
    createUserDto: CreateUserDto,
    file?: Express.Multer.File,
  ): Promise<any> {
    const { otp, ...payload } = createUserDto;
    const otpValid = await this.checkOtp(payload.email, otp);

    if (!otpValid) {
      throw new HttpException(
        'Otp expired, please send again',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    if (file) {
      const avatar = await this.userService.uploadImageToCloudinary(file);
      payload.avatar = { public_id: avatar.public_id, url: avatar.url };
    }

    const user = await this.userService.create(payload);
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
    const user = await this.userService.findByEmail(
      email,
      '-password -refreshToken',
    );

    if (!user) {
      throw new HttpException('Invalid token!', HttpStatus.UNAUTHORIZED);
    }

    // giải quyết trường hợp: khi logout mà refresh token bị null nhưng access token vẫn còn hạn
    // nên vẫn vào được các router cần access token nên ta phải check refresh token ở đoạn này nữa

    //Đây là giải pháp khi sử dụng Bearer Token (not save token in cookies)
    // if (user?.refreshToken == null) {
    //   throw new HttpException(
    //     'Invalid refresh token!',
    //     HttpStatus.UNAUTHORIZED,
    //   );
    // }

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

  async sendOtp(email: string): Promise<any> {
    const otp = speakeasy.totp({
      secret: this.configService.get<string>('OTP_SECRET'),
      encoding: 'base32',
    });

    const otpToken = {
      email: email,
      otp: otp,
      expires: Date.now() + 2 * 2 * 1000,
    };

    await this.otpRepository.create(otpToken);
    await this.mailService.sendMail({
      to: email,
      subject: 'Request Password',
      context: {
        email,
        otp,
      },
      template: './request_reset_password',
    });

    return {
      otp,
    };
  }

  async resetPassword(
    userChangePasswordDto: UserChangePasswordDto,
  ): Promise<IResponse> {
    const { email, otp } = userChangePasswordDto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new HttpException('User not exist', HttpStatus.NOT_FOUND);
    }

    const otpValid = await this.checkOtp(email, otp);

    if (!otpValid) {
      throw new HttpException('Invalid OTP', HttpStatus.NOT_ACCEPTABLE);
    }

    userChangePasswordDto.password = await bcrypt.hash(
      userChangePasswordDto.password,
      10,
    );
    await this.userService.update(
      { email },
      {
        password: userChangePasswordDto.password,
      },
    );

    return {
      status: 'Successfully!',
      msg: 'Changed Password',
    };
  }

  async checkOtp(email: string, otp: string): Promise<boolean> {
    const checkOtpValid = speakeasy.totp.verify({
      secret: this.configService.get<string>('OTP_SECRET'),
      encoding: 'base32',
      token: otp,
      window: 2, // 2 minutes
    });

    if (!checkOtpValid) {
      throw new HttpException('Invalid OTP', HttpStatus.NOT_ACCEPTABLE);
    }

    // kiem tra otp trong db cua user
    const otpDb = await this.otpRepository.getByCondition(
      {
        email: email,
      },
      null,
      null,
      null,
      { createdAt: -1 },
    );

    if (!otpDb[0]) {
      throw new HttpException(
        'Invalid OTP',
        HttpStatus.NON_AUTHORITATIVE_INFORMATION,
      );
    }

    return otp == otpDb[0].otp;
  }
}

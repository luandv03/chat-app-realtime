import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { jwtConstrant } from '../constrant/jwt.constrant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstrant.SECRET_KEY,
    });
  }

  //By default, the 'validate()' method in strategy only sends the payload of the decrypted access token.
  //Ở đây nó sẽ tự động lấy token trên Header để giải mã (nhìn vào line 11 ở trên) sẽ được 1 Object (payload)
  //chứa { email, iat, exp } khi login chúng ta dùng jwtService.sign() bên authService
  async validate(payload: any): Promise<any> {
    const user = await this.authService.validate(payload.email);

    return user;
  }
}

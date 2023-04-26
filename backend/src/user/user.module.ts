import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from './model/user.model';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { jwtConstrant } from './constrant/jwt.constrant';
import { UserController } from './controllers/user.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MailModule } from 'src/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { OtpSchema } from './model/otp.model';
import { OtpRepository } from './repositories/otp.repository';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'Otp',
        schema: OtpSchema,
      },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: jwtConstrant.SECRET_KEY,
      signOptions: { expiresIn: jwtConstrant.EXPIRES_IN },
    }),
    CloudinaryModule,
    MailModule,
  ],
  controllers: [AuthController, UserController],
  providers: [
    UserRepository,
    OtpRepository,
    UserService,
    JwtStrategy,
    AuthService,
  ],
  exports: [JwtStrategy, UserRepository],
})
export class UserModule {}

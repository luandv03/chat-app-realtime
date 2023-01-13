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

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
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
  ],
  controllers: [AuthController, UserController],
  providers: [UserRepository, UserService, JwtStrategy, AuthService],
  exports: [JwtStrategy, UserRepository],
})
export class UserModule {}

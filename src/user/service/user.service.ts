import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(user: CreateUserDto): Promise<any> {
    const userExisted = await this.findByEmail(user.email);

    if (userExisted) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }

    if (user.password !== user.confirmPassword) {
      throw new HttpException(
        'Password and confirm password not match!',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.password = bcrypt.hashSync(user.password, 10);
    return await this.userRepository.create(user);
  }

  async findByLogin(payload: {
    email: string;
    password: string;
  }): Promise<any> {
    const user = await this.findByEmail(payload.email);

    if (!user) {
      throw new HttpException('User not exist', HttpStatus.NOT_FOUND);
    }

    const is_equal = bcrypt.compareSync(payload.password, user.password);

    if (!is_equal) {
      throw new HttpException('Password is incorrect', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findByEmail(email: string, select?: string): Promise<any> {
    const user = await this.userRepository.findByCondition({ email }, select);

    return user;
  }

  //update refresh token
  async update(filter, update): Promise<any> {
    if (update.refreshToken) {
      update.refreshToken = await bcrypt.hash(update.refreshToken, 10);
    }

    return await this.userRepository.findByConditionAndUpdate(filter, update);
  }

  async getUserByRefesh(refresh_token, email: string): Promise<any> {
    const user = await this.userRepository.findByCondition({ email });

    if (!user) {
      throw new HttpException('Invalid token!', HttpStatus.UNAUTHORIZED);
    }

    const is_equal = bcrypt.compareSync(refresh_token, user.refreshToken);

    if (!is_equal) {
      throw new HttpException('Invalid token!', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  //search users with email or fullname
  async findUserWithSearch(user: any, searchValue: string): Promise<any> {
    const users = await this.userRepository.getByCondition({
      $or: [
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ['$firstname', ' ', '$lastname'] },
              regex: searchValue,
              options: 'i',
            },
          },
        },
        {
          email: { $regex: searchValue, $options: 'i' },
        },
      ],
      _id: { $ne: user._id },
    });

    return users;
  }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinaryService.uploadImage(file).catch(() => {
      throw new HttpException('Invalid file type.', HttpStatus.BAD_REQUEST);
    });
  }

  async destroyImageInCloudinary(public_id: string): Promise<any> {
    return await this.cloudinaryService.destroyImage(public_id);
  }
}

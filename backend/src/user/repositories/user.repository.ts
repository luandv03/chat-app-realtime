import { Model } from 'mongoose';
import { User } from '../model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/base.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    super(userModel);
  }
}

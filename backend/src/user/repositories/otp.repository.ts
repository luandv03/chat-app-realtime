import { Otp } from './../model/otp.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/base.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpRepository extends BaseRepository<Otp> {
  constructor(@InjectModel('Otp') private readonly otpModel: Model<Otp>) {
    super(otpModel);
  }
}

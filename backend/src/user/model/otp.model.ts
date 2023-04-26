import mongoose from 'mongoose';

export const OtpSchema = new mongoose.Schema(
  {
    email: { type: String },
    otp: { type: String },
    expires: { type: Number },
  },
  {
    collection: 'otps',
    timestamps: true,
  },
);

export class Otp extends mongoose.Document {
  email: string;
  otp: string;
  expires: number;
}

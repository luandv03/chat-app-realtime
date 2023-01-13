import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    avatar: {
      type: Object,
      required: true,
      default: {
        public_id: 'imagedinhvanluan',
        url: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg',
      },
    },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

export interface User extends mongoose.Document {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  avatar: string;
  refreshToken: string;
}

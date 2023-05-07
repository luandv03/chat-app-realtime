import mongoose from 'mongoose';
import { User } from '../../user/model/user.model';
import { Chat } from '../../chat/model/chat.model';

export const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', //tham chiếu đến User Model
    },
    content: { type: String, trim: true },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },
  },
  {
    timestamps: true,
    collection: 'messages',
  },
);

export interface Message extends mongoose.Document {
  sender: User;
  content: string;
  chat: Chat;
}

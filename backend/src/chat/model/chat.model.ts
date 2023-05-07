import mongoose from 'mongoose';
import { User } from '../../user/model/user.model';
import { Message } from '../../message/model/message.model';

export const ChatSchema = new mongoose.Schema(
  {
    chatName: { type: String, require: true, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: null,
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    collection: 'chats',
  },
);

export interface Chat extends mongoose.Document {
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  latestMessage: Message[];
  groupAdmin: string;
}

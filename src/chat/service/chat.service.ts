import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ChatRepository } from '../repositories/chat.repository';
import { UserRepository } from '../../user/repositories/user.repository';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async accessChat(user, userId): Promise<any> {
    let isChat = await this.chatRepository.findByCondition(
      {
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: user._id } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      },
      null,
      null,
      [{ path: 'users', select: '-password' }, { path: 'latestMessage' }],
    );

    isChat = await this.userRepository.populate(isChat, {
      path: 'latestMessage.sender',
      select: 'email firstname lastname avatar',
    });

    // Tao nghĩ: khi thằng đăng nhập mà tìm kiếm rồi ấn vào thằng nào đấy
    // nếu mà thằng kia có trong danh sách chat rồi thì nó sẽ trả ra đoạn chat giữa 2 thằng
    //isChat.length > 0 return isChat[0]
    if (isChat) {
      return isChat;
    } else {
      const chatData = {
        chatName: 'anonymous',
        isGroupChat: false,
        users: [user._id, userId],
      };

      try {
        const chat = await this.chatRepository.create(chatData);

        const fullChat = await this.chatRepository.findByCondition(
          {
            _id: chat._id,
          },
          null,
          null,
          { path: 'users', select: '-password' },
        );

        return fullChat;
      } catch (e) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}

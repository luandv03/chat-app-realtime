import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../repository/message.repository';
import { MessageDto } from '../dto/message.dto';
import { ChatRepository } from './../../chat/repositories/chat.repository';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly chatRepository: ChatRepository,
  ) {}

  async sendMessage(user: any, messageDto: MessageDto): Promise<any> {
    const { chatId, content } = messageDto;

    const message = {
      sender: user._id,
      content,
      chat: messageDto.chatId,
    };

    const sentMessage = await this.messageRepository.create(message);
    await sentMessage.populate([
      { path: 'sender', select: '-password -refreshToken' },
      { path: 'chat' },
    ]);

    await this.chatRepository.findByIdAndUpdate(chatId, {
      latestMessage: sentMessage,
    });

    return sentMessage;
  }

  async fetchMessage(chatId: string): Promise<any> {
    const messages = await this.messageRepository.getByCondition(
      {
        chat: chatId,
      },
      null,
      null,
      [
        { path: 'sender', select: '-password -refreshToken' },
        {
          path: 'chat',
        },
      ],
    );

    return messages;
  }
}

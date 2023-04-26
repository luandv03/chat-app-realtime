import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ChatRepository } from '../repositories/chat.repository';
import { UserRepository } from '../../user/repositories/user.repository';
import {
  UpdateGroupDto,
  AddNewUserDto,
  RemoveUserDto,
} from './../dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly userRepository: UserRepository,
  ) {}

  // truy cập đoạn chat 1-1 (nếu đã tồn tại) , nếu chưa tồn tại thì tạo
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

  async fetchChatUser(user: any): Promise<any> {
    try {
      let chatUser: any = await this.chatRepository.getByCondition(
        {
          users: { $elemMatch: { $eq: user._id } },
          latestMessage: { $exists: true },
        },
        null,
        null,
        [
          { path: 'users', select: '-password' },
          { path: 'latestMessage' },
          { path: 'groupAdmin', select: '-password' },
        ],
      );

      chatUser = await this.userRepository.populate(chatUser, {
        path: 'latestMessage.sender',
        select: 'name avatar email firstname lastname',
      });

      return chatUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createGroup(user: any, groupChat: any): Promise<any> {
    if (!groupChat.name || !groupChat.users) {
      throw new HttpException('Please fill all field!', HttpStatus.BAD_REQUEST);
    }

    groupChat.users.push(user._id);

    const group = await this.chatRepository.create({
      chatName: groupChat?.chatName,
      isGroupChat: true,
      users: groupChat.users,
      groupAdmin: user._id,
    });

    return group;
  }

  async renameGroup(user: any, updateGroupDto: UpdateGroupDto): Promise<any> {
    const { name, groupId } = updateGroupDto;

    const updatedGroup = await this.chatRepository.findByIdAndUpdate(groupId, {
      chatName: name,
    });
    if (!updatedGroup) {
      throw new HttpException('Have error', HttpStatus.BAD_REQUEST);
    }

    await updatedGroup.populate([
      { path: 'users', select: '-password -refreshToken' },
      { path: 'groupAdmin', select: '-password -refreshToken' },
    ]);

    return updatedGroup;
  }

  async addNewUser(addNewUserDto: AddNewUserDto): Promise<any> {
    const { groupId, newUser } = addNewUserDto;

    const addedUser = await this.chatRepository.findByIdAndUpdate(groupId, {
      $push: { users: { $each: newUser } },
    });

    if (!addedUser)
      throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);

    return {
      status: 'Add new user successfull!',
    };
  }

  async removeUser(user: any, removeUserDto: RemoveUserDto): Promise<any> {
    const { groupId, removeUser } = removeUserDto;
    const groupChat = await this.chatRepository.findByCondition({
      _id: groupId,
    });
    groupChat.populate('users', '-password -refreshToken');

    //check roles
    if (!groupChat.groupAdmin.equals(user._id)) {
      throw new HttpException('You not have role!', HttpStatus.FORBIDDEN);
    }

    const removedUser = await this.chatRepository.findByIdAndUpdate(groupId, {
      $pull: { users: { $in: removeUser } },
    });

    if (!removedUser) {
      throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
    }
    return {
      status: 'Remove successfully!',
    };
  }
}

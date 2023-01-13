import {
  Controller,
  Body,
  UseGuards,
  Post,
  Get,
  Put,
  Req,
} from '@nestjs/common';
import { ChatService } from '../service/chat.service';
import { JwtAuthGuard } from '../../user/guards/jwt-auth.guard';
import { Request } from 'express';
import {
  CreateGroupDto,
  UpdateGroupDto,
  AddNewUserDto,
  RemoveUserDto,
} from '../dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async accessChat(
    @Body('userId') userId: string,
    @Req() req: Request,
  ): Promise<any> {
    return await this.chatService.accessChat(req.user, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchChatUser(@Req() req: Request): Promise<any> {
    return await this.chatService.fetchChatUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/group_chat')
  async createGroup(
    @Req() req: Request,
    @Body() createGroupChat: CreateGroupDto,
  ): Promise<any> {
    return await this.chatService.createGroup(req.user, createGroupChat);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/rename_group')
  async renameGroup(
    @Req() req: Request,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<any> {
    return await this.chatService.renameGroup(req.user, updateGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/add_user')
  async addNewUser(@Body() addNewUserDto: AddNewUserDto): Promise<any> {
    return await this.chatService.addNewUser(addNewUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/remove_user')
  async removeUser(
    @Req() req: Request,
    @Body() removeUserDto: RemoveUserDto,
  ): Promise<any> {
    return await this.chatService.removeUser(req.user, removeUserDto);
  }
}

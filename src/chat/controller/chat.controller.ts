import { Controller, Body, UseGuards, Post, Req } from '@nestjs/common';
import { ChatService } from '../service/chat.service';
import { JwtAuthGuard } from '../../user/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async accessChat(
    @Body('userId') userId: string,
    @Req() req: Request,
  ): Promise<any> {
    console.log(req.user);
    return await this.chatService.accessChat(req.user, userId);
  }
}

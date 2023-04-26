import {
  Controller,
  Post,
  Req,
  UseGuards,
  Body,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { MessageService } from './../service/message.service';
import { MessageDto } from './../dto/message.dto';
import { User } from 'src/user/model/user.model';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async sendMessage(
    @Req() req: Request,
    @Body() messageDto: MessageDto,
  ): Promise<any> {
    return await this.messageService.sendMessage(req.user, messageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:chatId')
  async fetchMessage(@Param('chatId') chatId: string): Promise<any> {
    return await this.messageService.fetchMessage(chatId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:message_id')
  async deleteMessage(
    @Param('message_id') message_id: string,
    @Req() req: Request,
  ): Promise<void> {
    const user = req.user as User;
    return await this.messageService.deleteMessage(message_id, user);
  }
}

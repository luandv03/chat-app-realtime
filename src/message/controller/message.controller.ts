import {
  Controller,
  Post,
  Req,
  UseGuards,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { MessageService } from './../service/message.service';
import { MessageDto } from './../dto/message.dto';

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
}

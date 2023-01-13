import { UserModule } from 'src/user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './model/chat.model';
import { ChatRepository } from './repositories/chat.repository';
import { ChatController } from './controller/chat.controller';
import { ChatService } from './service/chat.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
    UserModule,
  ],
  controllers: [ChatController],
  providers: [ChatRepository, ChatService],
  exports: [ChatRepository],
})
export class ChatModule {}

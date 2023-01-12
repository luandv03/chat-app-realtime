import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { MessageController } from './controller/message.controller';
import { MessageSchema } from './model/message.model';
import { MessageRepository } from './repository/message.repository';
import { MessageService } from './service/message.service';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    UserModule,
    ChatModule,
  ],
  controllers: [MessageController],
  providers: [MessageRepository, MessageService],
})
export class MessageModule {}

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
    // credentials: true,
  },
})
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('new connection!');
  }

  @SubscribeMessage('setup')
  setUpRoomChat(
    @MessageBody() userData: any,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(userData._id);
    socket.emit('connected');
    console.log('set up:', socket.id);
  }

  @SubscribeMessage('join chat')
  joinChatRoom(
    @MessageBody() chatId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(chatId);
    console.log('User Joined Room: ' + chatId);
    console.log('join chat: ', socket.id);
  }

  @SubscribeMessage('new message')
  listenForMessages(
    @MessageBody() newMessageRecieved: any,
    @ConnectedSocket() socket: Socket,
  ) {
    const chat = newMessageRecieved.chat;

    if (!chat.users) return console.log('chat.users not defined');

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(chat._id).emit('message recieved', newMessageRecieved);
    });
  }
}

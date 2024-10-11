import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);
  }
  handleConnection(client: Socket) {
    console.log('Client connected', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log('Received message from client', client.id, data);
    // this.server.emit('message', data);
    client.broadcast.emit('message', data);
  }

}

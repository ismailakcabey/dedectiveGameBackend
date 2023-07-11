import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class TeamGateway implements OnModuleInit {

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id)
            console.log('connected')
        })
    }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('teamChannelSendMessage')
    onNewMessage(
        @MessageBody() body: {
            sender: string,
            contet: string,
            teamId: string
        }
    ) {
        console.log(body)
        this.server.emit('listenMessage/' + body.teamId, {

            ...body,
            createdAt: new Date(), // Yeni createdAt özelliği

        })
    }


}

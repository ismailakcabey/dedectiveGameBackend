import { Module } from "@nestjs/common";
import { UserTable } from "../user/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageTable } from "./message.entity";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([UserTable]),
        TypeOrmModule.forFeature([MessageTable]),
    ],
    controllers:[
        MessageController
    ],
    providers:[
        MessageService
    ],
    exports:[],
})

export class MessageModule {}